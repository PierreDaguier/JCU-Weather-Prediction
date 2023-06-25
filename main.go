package main

import (
	"encoding/json"
	"net/http"
	"os/exec"
	"strconv"
	"strings"
)

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func predictHandler(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	var req struct {
		Date          string  `json:"date"`
		Location      string  `json:"location"`
		MinTemp       float64 `json:"minTemp"`
		MaxTemp       float64 `json:"maxTemp"`
		Rainfall      float64 `json:"rainfall"`
		Evaporation   float64 `json:"evaporation"`
		Sunshine      float64 `json:"sunshine"`
		WindGustDir   string  `json:"windGustDir"`
		WindGustSpeed float64 `json:"windGustSpeed"`
		WindDir9am    string  `json:"windDir9am"`
		WindDir3pm    string  `json:"windDir3pm"`
		WindSpeed9am  float64 `json:"windSpeed9am"`
		WindSpeed3pm  float64 `json:"windSpeed3pm"`
		Humidity9am   float64 `json:"humidity9am"`
		Humidity3pm   float64 `json:"humidity3pm"`
		Pressure9am   float64 `json:"pressure9am"`
		Pressure3pm   float64 `json:"pressure3pm"`
		Cloud9am      float64 `json:"cloud9am"`
		Cloud3pm      float64 `json:"cloud3pm"`
		Temp9am       float64 `json:"temp9am"`
		Temp3pm       float64 `json:"temp3pm"`
		RainToday     string  `json:"rainToday"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Convert all the input values to strings and pass them as arguments
	cmd := exec.Command("python3", "predict.py", req.Date, req.Location, strconv.FormatFloat(req.MinTemp, 'f', 6, 64),
		strconv.FormatFloat(req.MaxTemp, 'f', 6, 64), strconv.FormatFloat(req.Rainfall, 'f', 6, 64), strconv.FormatFloat(req.Evaporation, 'f', 6, 64),
		strconv.FormatFloat(req.Sunshine, 'f', 6, 64), req.WindGustDir, strconv.FormatFloat(req.WindGustSpeed, 'f', 6, 64), req.WindDir9am, req.WindDir3pm,
		strconv.FormatFloat(req.WindSpeed9am, 'f', 6, 64), strconv.FormatFloat(req.WindSpeed3pm, 'f', 6, 64), strconv.FormatFloat(req.Humidity9am, 'f', 6, 64),
		strconv.FormatFloat(req.Humidity3pm, 'f', 6, 64), strconv.FormatFloat(req.Pressure9am, 'f', 6, 64), strconv.FormatFloat(req.Pressure3pm, 'f', 6, 64),
		strconv.FormatFloat(req.Cloud9am, 'f', 6, 64), strconv.FormatFloat(req.Cloud3pm, 'f', 6, 64),
		strconv.FormatFloat(req.Temp9am, 'f', 6, 64), strconv.FormatFloat(req.Temp3pm, 'f', 6, 64), req.RainToday)

	// Execute the command and retrieve the output
	output, err := cmd.Output()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Write the output as the HTTP response
	result := strings.TrimSpace(string(output)) // converts output bytes to string and removes trailing and leading whitespace
	if result == "True" {
		json.NewEncoder(w).Encode(map[string]bool{"result": true})
	} else if result == "False" {
		json.NewEncoder(w).Encode(map[string]bool{"result": false})
	} else {
		http.Error(w, "Invalid output from Python script", http.StatusInternalServerError)
	}
}

func main() {
	http.HandleFunc("/predict", predictHandler)
	http.ListenAndServe(":8080", nil)
}
