import utils
import sys
api_key = "3023a65e-97bc-4d9a-a0b2-d308b4852946"
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

