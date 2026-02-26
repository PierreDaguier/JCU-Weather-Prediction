package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"time"
)

func allowedOrigin() string {
	origin := strings.TrimSpace(os.Getenv("ALLOWED_ORIGIN"))
	if origin == "" {
		return "*"
	}
	return origin
}

func setupResponse(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", allowedOrigin())
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization")
	(*w).Header().Set("Vary", "Origin")
}

func pythonBin() string {
	if configured := strings.TrimSpace(os.Getenv("PYTHON_BIN")); configured != "" {
		return configured
	}

	if _, err := exec.LookPath("python3"); err == nil {
		return "python3"
	}

	return "python"
}

func healthHandler(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func predictHandler(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
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

	cmd := exec.Command(
		pythonBin(),
		"predict.py",
		req.Date,
		req.Location,
		strconv.FormatFloat(req.MinTemp, 'f', 6, 64),
		strconv.FormatFloat(req.MaxTemp, 'f', 6, 64),
		strconv.FormatFloat(req.Rainfall, 'f', 6, 64),
		strconv.FormatFloat(req.Evaporation, 'f', 6, 64),
		strconv.FormatFloat(req.Sunshine, 'f', 6, 64),
		req.WindGustDir,
		strconv.FormatFloat(req.WindGustSpeed, 'f', 6, 64),
		req.WindDir9am,
		req.WindDir3pm,
		strconv.FormatFloat(req.WindSpeed9am, 'f', 6, 64),
		strconv.FormatFloat(req.WindSpeed3pm, 'f', 6, 64),
		strconv.FormatFloat(req.Humidity9am, 'f', 6, 64),
		strconv.FormatFloat(req.Humidity3pm, 'f', 6, 64),
		strconv.FormatFloat(req.Pressure9am, 'f', 6, 64),
		strconv.FormatFloat(req.Pressure3pm, 'f', 6, 64),
		strconv.FormatFloat(req.Cloud9am, 'f', 6, 64),
		strconv.FormatFloat(req.Cloud3pm, 'f', 6, 64),
		strconv.FormatFloat(req.Temp9am, 'f', 6, 64),
		strconv.FormatFloat(req.Temp3pm, 'f', 6, 64),
		req.RainToday,
	)

	output, err := cmd.Output()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	result := strings.TrimSpace(string(output))
	w.Header().Set("Content-Type", "application/json")

	switch result {
	case "True":
		_ = json.NewEncoder(w).Encode(map[string]bool{"result": true})
	case "False":
		_ = json.NewEncoder(w).Encode(map[string]bool{"result": false})
	default:
		http.Error(w, "invalid output from Python script", http.StatusInternalServerError)
	}
}

func main() {
	port := strings.TrimSpace(os.Getenv("PORT"))
	if port == "" {
		port = "8080"
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/health", healthHandler)
	mux.HandleFunc("/predict", predictHandler)

	server := &http.Server{
		Addr:              ":" + port,
		Handler:           mux,
		ReadHeaderTimeout: 15 * time.Second,
		ReadTimeout:       30 * time.Second,
		WriteTimeout:      120 * time.Second,
		IdleTimeout:       120 * time.Second,
	}

	log.Printf("JCU weather backend listening on :%s", port)
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
