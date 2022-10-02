from flask import Flask, request
from numpy import round
import json
import sys
import torch

app = Flask(__name__)

from sentence_transformers import SentenceTransformer, util


model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

@app.route("/hello_world", methods = ['GET'])
def helloWorld():
    return "Hello World", 200

@app.route("/getSimilarity" , methods = ['GET'])
def calculateSimilarity():
    args = request.args.to_dict()
    vibe = args["vibe"]
    review = json.loads(args["reviews"])
    

    # tempDict = {}
    # for name in review:
    #     temp = []
    #     for sentence in review.get(name):
    #         temp.append(sentence)

    #     tempDict[name] = temp
    
    returnDict = {}
    vibeList = [vibe]

    for name in review:
        tempList = review[name]
        
        embedding = model.encode(vibeList + tempList)
        cos_sim = util.cos_sim(embedding, embedding)
        cos_sim.tolist()
        
        all_sentence_combinations  = []
        for i in range(len(cos_sim)-1):
           for j in range(i+1, len(cos_sim)):
               all_sentence_combinations.append([cos_sim[i][j], i, j])
               
        all_sentence_combinations = sorted(all_sentence_combinations, key=lambda x: x[0], reverse=True)
        returnDict[name] = round(all_sentence_combinations,3).tolist();
        

    print(returnDict, file=sys.stderr)
    returnJson = json.dumps(returnDict)
    
    return returnJson


    

if __name__ == "__main__":
    app.run(host='0.0.0.0', port = 8080)