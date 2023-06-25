# JCU Weather Prediction Project

## Roadmap

1. Create model with Python and Fetch data with Go
2. Create ReactJS front-end for user experience
3. Push documentation online on React app
4. Check usecases, errors, unit tests
   
First push 20/06/2023: 

* Go and Python environment setup
* CSV extraction by main.go
* Testing data exploration with explore.go
* model.py empty so far

Second push 22/06/2023:

* main.go updated for improved data extraction
* predict.py creation, a script for using the trained model for future weather predictions
* model.py refined to include model evaluation and save the trained model

Third push (25/06/2023):

* Integration of a ReactJS frontend for better user experience
* Modification of backend scripts (main.go and predict.py) to ensure smooth interaction with frontend
* Successful execution of prediction flow from user interface to machine learning model and back

## About dataset used

> Observations were drawn from numerous weather stations. The daily observations are available from http://www.bom.gov.au/climate/data.
> An example of latest weather observations in Canberra: http://www.bom.gov.au/climate/dwo/IDCJDW2801.latest.shtml

> Definitions adapted from http://www.bom.gov.au/climate/dwo/IDCJDW0000.shtml
> Data source: http://www.bom.gov.au/climate/dwo/ and http://www.bom.gov.au/climate/data.

> Copyright Commonwealth of Australia 2010, Bureau of Meteorology.

## How to use this project

1. Ensure Go and Python environments are properly set up.
2. Run model.py to train the prediction model using the extracted data.
3. Use predict.py to make predictions using the trained model.
4. The frontend can be run by navigating to the 'frontend' directory and using the command npm start.


