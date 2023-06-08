import utils
import sys
api_key = "83263f0b-2414-49d7-a2d6-a80931377aa7"
State = sys.argv[1]
listing_url = utils.getState(State)
listing_response = utils.get_listings(api_key, listing_url)
listing_response.json().keys()
res = listing_response.json()["data"]["cat1"]["searchResults"]["mapResults"]
if len(sys.argv) > 2:
    Zip = sys.argv[2]
    if(Zip != "" and Zip != None):
        res = utils.filter_zip(res, Zip)
        

utils.send_listings(res)

