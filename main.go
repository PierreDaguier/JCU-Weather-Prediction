package main

import (
	"fmt"
	"os/exec"
	"strings"
)

func main() {
	// Call predict.py to have a prediction from the trained model
	cmd := exec.Command("python3", "predict.py")
	output, err := cmd.Output()
	if err != nil {
		fmt.Println(err)
		return
	}

	// Convert the output into a string
	outputStr := string(output)

	// Divide the output in string in many words so it's readable
	predictions := strings.Split(outputStr, "\n")

	// Print the predictions
	for i, prediction := range predictions {
		if prediction == "True" {
			fmt.Printf("Day %d: Rain\n", i+1)
		} else if prediction == "False" {
			fmt.Printf("Day %d: No Rain\n", i+1)
		}
	}
}
