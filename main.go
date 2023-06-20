package main

import (
    "encoding/csv"
    "fmt"
    "log"
    "os"
    "io"
)

func main() {
    // Open the file
    csvfile, err := os.Open("data/weatherAUS.csv")
    if err != nil {
        log.Fatalln("Couldn't open the csv file", err)
    }

    // Parse the file
    r := csv.NewReader(csvfile)

    // Iterate through the records
    for {
        record, err := r.Read()
        if err == io.EOF {
            break
        }
        if err != nil {
            log.Fatal(err)
        }

        fmt.Println(record)
    }
}
