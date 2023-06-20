package main

import (
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"

	"gonum.org/v1/gonum/stat"
)

func main() {
	// Open the file
	csvfile, err := os.Open("data/weatherAUS.csv")
	if err != nil {
		log.Fatalln("Couldn't open the csv file", err)
	}

	// Parse the file
	r := csv.NewReader(csvfile)

	// Read the header
	header, err := r.Read()
	if err != nil {
		log.Fatal(err)
	}

	// Find index of MinTemp and MaxTemp columns
	var minTempIndex, maxTempIndex int
	for i, column := range header {
		if column == "MinTemp" {
			minTempIndex = i
		} else if column == "MaxTemp" {
			maxTempIndex = i
		}
	}

	// Slice to hold min and max temperatures
	var minTemps, maxTemps []float64

	// Iterate through the records
	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}

		// Convert MinTemp to float and append to slice
		minTemp, err := strconv.ParseFloat(record[minTempIndex], 64)
		if err == nil {
			minTemps = append(minTemps, minTemp)
		}

		// Convert MaxTemp to float and append to slice
		maxTemp, err := strconv.ParseFloat(record[maxTempIndex], 64)
		if err == nil {
			maxTemps = append(maxTemps, maxTemp)
		}
	}

	// Print mean of min and max temperatures
	fmt.Printf("Mean MinTemp: %.2f\n", stat.Mean(minTemps, nil))
	fmt.Printf("Mean MaxTemp: %.2f\n", stat.Mean(maxTemps, nil))
}
