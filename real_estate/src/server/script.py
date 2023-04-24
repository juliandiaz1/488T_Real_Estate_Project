import pandas as pd
import numpy as np
import plotly.express as px
import requests
import sys
import json as js

def get_listings(api_key, listing_url):
    url = "https://app.scrapeak.com/v1/scrapers/zillow/listing"

    querystring = {
        "api_key": api_key,
        "url":listing_url
    }

    return requests.request("GET", url, params=querystring)

def send_listings(data):
    url = "http://localhost:3001/api/listing_data"
    requests.request("POST", url, json=data)



api_key = "3023a65e-97bc-4d9a-a0b2-d308b4852946"


State = sys.argv[1]

if State == "Alabama":
    listing_url = "https://www.zillow.com/al/?searchQueryState=%7B%22usersSearchTerm%22%3A%22617%20Washintgon%20St%20Erwin%2C%20TN%2037650%22%2C%22mapBounds%22%3A%7B%22north%22%3A35.72637801711301%2C%22east%22%3A-82.89045329687498%2C%22south%22%3A29.379707333780196%2C%22west%22%3A-90.47101970312498%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A7%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A4%2C%22regionType%22%3A2%7D%5D%2C%22pagination%22%3A%7B%7D%7D"
elif State == "Alaska":\
    listing_url = "https://www.zillow.com/ak/?searchQueryState=%7B%22usersSearchTerm%22%3A%22617%20Washintgon%20St%20Erwin%2C%20TN%2037650%22%2C%22mapBounds%22%3A%7B%22north%22%3A73.8605147329746%2C%22east%22%3A-119.35446875%2C%22south%22%3A45.7956832215216%2C%22west%22%3A-179.999%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A4%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A3%2C%22regionType%22%3A2%7D%5D%2C%22pagination%22%3A%7B%7D%7D"
elif State == "Arizona":
    listing_url = "https://www.zillow.com/az/?searchQueryState=%7B%22usersSearchTerm%22%3A%22617%20Washintgon%20St%20Erwin%2C%20TN%2037650%22%2C%22mapBounds%22%3A%7B%22north%22%3A37.273648515974386%2C%22east%22%3A-108.140623796875%2C%22south%22%3A31.04308633047789%2C%22west%22%3A-115.721190203125%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A7%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A8%2C%22regionType%22%3A2%7D%5D%2C%22pagination%22%3A%7B%7D%7D"
elif State == "Arkansas":
    listing_url = "https://www.zillow.com/ar/?searchQueryState=%7B%22usersSearchTerm%22%3A%22617%20Washintgon%20St%20Erwin%2C%20TN%2037650%22%2C%22mapBounds%22%3A%7B%22north%22%3A37.80711801863995%2C%22east%22%3A-88.341095296875%2C%22south%22%3A31.617770282230037%2C%22west%22%3A-95.921661703125%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A7%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A6%2C%22regionType%22%3A2%7D%5D%2C%22pagination%22%3A%7B%7D%7D"
elif State == "California":
    listing_url = "https://www.zillow.com/ca/?searchQueryState=%7B%22usersSearchTerm%22%3A%22617%20Washintgon%20St%20Erwin%2C%20TN%2037650%22%2C%22mapBounds%22%3A%7B%22north%22%3A43.1618551749633%2C%22east%22%3A-111.72608259375001%2C%22south%22%3A31.19957330351528%2C%22west%22%3A-126.88721540625%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A6%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A9%2C%22regionType%22%3A2%7D%5D%2C%22pagination%22%3A%7B%7D%7D"
elif State == "Colorado":
    listing_url = "https://www.zillow.com/co/?searchQueryState=%7B%22usersSearchTerm%22%3A%22617%20Washintgon%20St%20Erwin%2C%20TN%2037650%22%2C%22mapBounds%22%3A%7B%22north%22%3A41.89281177226884%2C%22east%22%3A-101.760283796875%2C%22south%22%3A36.038816976583995%2C%22west%22%3A-109.340850203125%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A7%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A10%2C%22regionType%22%3A2%7D%5D%2C%22pagination%22%3A%7B%7D%7D"
elif State == "Connecticut":
    listing_url = "https://www.zillow.com/ct/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527097815|aud-457069900685:kwd-409215547157|649039147826|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKsrX3ZPNUNmwFR6wXbkbpo1uzGI5uLVEBoXLxkiiOXFQvfXQLHIIWsaAmsHEALw_wcB"
elif State == "Delaware":
    listing_url = "https://www.zillow.com/de/?searchQueryState=%7B%22usersSearchTerm%22%3A%22617%20Washintgon%20St%20Erwin%2C%20TN%2037650%22%2C%22mapBounds%22%3A%7B%22north%22%3A40.36218340537771%2C%22east%22%3A-73.55759086693789%2C%22south%22%3A37.43009897428272%2C%22west%22%3A-77.34787407006289%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A8%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A13%2C%22regionType%22%3A2%7D%5D%2C%22pagination%22%3A%7B%7D%7D"
elif State == "Flordia":
    listing_url = "https://www.zillow.com/fl/?searchQueryState=%7B%22usersSearchTerm%22%3A%22617%20Washintgon%20St%20Erwin%2C%20TN%2037650%22%2C%22mapBounds%22%3A%7B%22north%22%3A34.204523312786876%2C%22east%22%3A-76.22403459375002%2C%22south%22%3A20.886516602197208%2C%22west%22%3A-91.38516740625002%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A6%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A14%2C%22regionType%22%3A2%7D%5D%2C%22pagination%22%3A%7B%7D%7D"
elif State == "Georgia":
    listing_url = "https://www.zillow.com/ga/?searchQueryState=%7B%22usersSearchTerm%22%3A%22617%20Washintgon%20St%20Erwin%2C%20TN%2037650%22%2C%22mapBounds%22%3A%7B%22north%22%3A35.82189379838878%2C%22east%22%3A-79.388013796875%2C%22south%22%3A29.4822421033303%2C%22west%22%3A-86.968580203125%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A7%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A16%2C%22regionType%22%3A2%7D%5D%2C%22pagination%22%3A%7B%7D%7D"
elif State == "Hawaii":
    listing_url = "https://www.zillow.com/hi/?searchQueryState=%7B%22usersSearchTerm%22%3A%22617%20Washintgon%20St%20Erwin%2C%20TN%2037650%22%2C%22mapBounds%22%3A%7B%22north%22%3A36.75254457427471%2C%22east%22%3A-149.676734375%2C%22south%22%3A9.379173214504409%2C%22west%22%3A-179.999%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A5%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A18%2C%22regionType%22%3A2%7D%5D%2C%22pagination%22%3A%7B%7D%7D"
elif State == "Idaho":
    listing_url = "https://www.zillow.com/id/?searchQueryState=%7B%22usersSearchTerm%22%3A%22617%20Washintgon%20St%20Erwin%2C%20TN%2037650%22%2C%22mapBounds%22%3A%7B%22north%22%3A50.629931709855136%2C%22east%22%3A-106.56269459374998%2C%22south%22%3A40.083931700727035%2C%22west%22%3A-121.72382740624998%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A6%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A20%2C%22regionType%22%3A2%7D%5D%2C%22pagination%22%3A%7B%7D%7D"
elif State == "Illinois":
    listing_url = "https://www.zillow.com/il/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527098015|aud-352785740844:kwd-340548454481|649039132277|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKvHDaGDVeGFAJUZ5_aq656dAcKoNjMNnCtTRPg1ueQOgN634oWX3DQaAm1IEALw_wcB"
elif State == "Indiana":
    listing_url = "https://www.zillow.com/in/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527098015|aud-352785740844:kwd-340548454481|649039132277|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKvHDaGDVeGFAJUZ5_aq656dAcKoNjMNnCtTRPg1ueQOgN634oWX3DQaAm1IEALw_wcB&searchQueryState=%7B%22mapBounds%22%3A%7B%22north%22%3A42.629532572226346%2C%22east%22%3A-82.650993796875%2C%22south%22%3A36.83964613579312%2C%22west%22%3A-90.231560203125%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A7%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A22%2C%22regionType%22%3A2%7D%5D%2C%22pagination%22%3A%7B%7D%7D"
elif State == "Iowa":
    listing_url = "https://www.zillow.com/ia/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527098015|aud-352785740844:kwd-340548454481|649039132277|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKvHDaGDVeGFAJUZ5_aq656dAcKoNjMNnCtTRPg1ueQOgN634oWX3DQaAm1IEALw_wcB&searchQueryState=%7B%22mapBounds%22%3A%7B%22north%22%3A44.69797291463958%2C%22east%22%3A-89.599514796875%2C%22south%22%3A39.09386140014089%2C%22west%22%3A-97.180081203125%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A7%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A19%2C%22regionType%22%3A2%7D%5D%2C%22pagination%22%3A%7B%7D%7D"
elif State == "Kansas":
    listing_url = "https://www.zillow.com/ks/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527100175|aud-456022128469:kwd-442006803335|649039147862|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKsw5kojVCPpwxbJOxjp42w3uIGVcNPCCY3BKmy0Ybak6i1AIVAlG9gaAoiUEALw_wcB"
elif State == "Kentucky":
    listing_url = "https://www.zillow.com/ky/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527100215|aud-298298841046:kwd-358484206271|649039147865|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKt9iOFzbAuXYzvFl-_JOsq08D5QLJmcCSUo4IANeCfK6Xt3iJg7GWwaApKREALw_wcB"
elif State == "Louisiana":
    listing_url = "https://www.zillow.com/la/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527098695|aud-352785740844:kwd-421540411595|649039147832|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKu8T_EqqGdVckiSTdmLrz4HetU0C-TO6xQUlWU_3N7YLyD04oMFSd0aAinOEALw_wcB"
elif State == "Maine":
    listing_url = "https://www.zillow.com/homes/maine_rb/?utm_medium=cpc&utm_source=google&utm_content=12364776953|121612014127|aud-1415594728965:kwd-358484207511|602851051178|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKvU4LDf3-r1nSrUg7XUP_qbyDvz_uI7w8OPbYTZgv8SFk_JWqnXiLUaAjf_EALw_wcB"
elif State == "Maryland":
    listing_url = "https://www.zillow.com/md/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527099415|aud-352785741244:kwd-358484207951|602733267327|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKsOqyeMMbRnx-5r9K9bqLzPXQEcMIwYdrX4BwWWZNb8-dcRevwGXK4aAoYBEALw_wcB"
elif State == "Massachusetts":
    listing_url = "https://www.zillow.com/ma/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527098735|aud-1415594728965:kwd-392922248769|649039132298|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKuDuG1M24ex_utGbCzFujm5B8qUE9t67xFHSdfxFv0Qxg2hElEM5e4aAl6vEALw_wc"
elif State == "Michigan":
    listing_url = "https://www.zillow.com/mi/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527099455|aud-298298841046:kwd-358484208191|602733267330|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKsyHO69BAZNpCwtOYXhFjMpXQ8YhwpydlaWXakIUVCJMt1SGBpFKUgaAiNrEALw_wcB"
elif State == "Minnesota":
    listing_url = "https://www.zillow.com/mn/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527097535|aud-456022128629:kwd-308012272515|602733267300|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKv90UbBg1LKnTdH-56DdQfZ84JvBj8YKax-Jh-7JQpE1A_Y0Pc-WsYaAulZEALw_wcB"
elif State == "Mississippi":
    listing_url = "https://www.zillow.com/ms/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527096815|aud-298298841046:kwd-484839374369|602733267354|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKsS0tkVA9orgGjmbGDnaECFYn93qOini_moZr8In7LKcQw9EGMuBj8aAqC8EALw_wcB&searchQueryState=%7B%22mapBounds%22%3A%7B%22north%22%3A35.72125593396076%2C%22east%22%3A-86.08616529687501%2C%22south%22%3A29.37420940865332%2C%22west%22%3A-93.666731703125%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A7%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A34%2C%22regionType%22%3A2%7D%5D%2C%22pagination%22%3A%7B%7D%7D"
elif State == "Missouri":
    listing_url = "https://www.zillow.com/mo/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527098775|aud-352785741284:kwd-453494087244|649039147835|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKtOmwKVYiVwcPjFuUlkgWM_TLvu1aX9Nnqiehu8x-ltm8W3qVe45ZkaAtl2EALw_wcB"
elif State == "Montana":
    listing_url = "https://www.zillow.com/mt/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527099495|aud-352785740844:kwd-401892723332|649039132310|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKuD4zPzXiW33kKt6ZDKkjM4RXLDx3e4pJM_x5rNFqj-wGdgURrYFkcaAtn3EALw_wcB"
elif State == "Nebraska":
    listing_url = "https://www.zillow.com/ne/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527099655|aud-352785741564:kwd-423057458070|649039132313|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKvbaZXHzqroz-Dl6pCaXWwW2bx50SRfw3GLM_Vup_OfDIGoASDpuV4aAmHvEALw_wcB"
elif State == "Nevada":
    listing_url = "https://www.zillow.com/homes/nevada_rb/?utm_medium=cpc&utm_source=google&utm_content=12364776953|120447892000|aud-457069900685:kwd-358484209391|602850908762|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKuXH9-SI6_9UBsTWVZe_DRBUWMnbGHuMzElL3icWk7tDYIFKcYeP9kaAiAfEALw_wcB"
elif State == "New Hampshire":
    listing_url = "https://www.zillow.com/nh/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527097015|aud-834134226151:kwd-346051782663|649039147880|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKuNizI1pbTXmohFy8bKhkQ_-VH4e-Xm_IBJ2xKy2O8kg3mp3AXc9IoaAjkyEALw_wcB"
elif State == "New Jersey":
    listing_url = "https://www.zillow.com/nj/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527098935|aud-352785741284:kwd-319884822138|642325660472|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKthrHSPo-f1fDDeGFiCHEPxt4O8zH6XLho3vCRaKvbn_g428jAkfxoaAqPTEALw_wcB"
elif State == "New Mexico":
    listing_url = "https://www.zillow.com/nm/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527098215|aud-352785741284:kwd-335514279566|499339726710|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKskwu1bFpg5AiF7gvy9uUaz3m-gbAiVLBI0WNK_uIrmG3w9_8lZ_0QaAgKuEALw_wcB"
elif State == "New York":
    listing_url = "https://www.zillow.com/new-york-ny/?utm_medium=cpc&utm_source=google&utm_content=12364776953|118731479035|aud-455958732640:kwd-318899146450|602785234993|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKtq8AS1ZJQB65mNbkUfF-RyVSNUNOzZoJtaQX84Qw8eQ_HAIi9okrwaAg2LEALw_wcB"
elif State == "North Carolina":
    listing_url = "https://www.zillow.com/nc/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527098255|aud-1415594729165:kwd-299103370265|649039132286|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKteWi-Y41-ErkgpgzSemB2y451Fd6CH3RomIwt_BjXuq81oUlcQ1HYaArosEALw_wcB"
elif State == "North Dakota":
    listing_url = "https://www.zillow.com/nd/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527099695|aud-352785741564:kwd-470582786049|642325660694|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKutxNDD7U_-2B2WfjODX8bXf6bByGo7lkruTeLw-y34ZKTcCxc01SMaArgFEALw_wcB"
elif State == "Ohio":
    listing_url = "https://www.zillow.com/oh/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527097295|aud-298298841046:kwd-315885433891|602733267483|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKtvjKVNpB5HFYOexkcHb8prqYoH7nNBIIItF-dEDTcBYaQG8dFynroaAuNAEALw_wcB"
elif State == "Oklahoma":
    listing_url = "https://www.zillow.com/ok/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527099735|aud-298298841046:kwd-375709049967|602733267333|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKto_QWIOW1wqy_1pclFwimU_U_VsRknxcHnPEAzde7I_rdecEynth4aAtymEALw_wcB"
elif State == "Oregon":
    listing_url = "https://www.zillow.com/homes/oregon_rb/?utm_medium=cpc&utm_source=google&utm_content=12364776953|113098019890|aud-456022128629:kwd-38120362785|499427116487|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKvt-jlmm4Psx6jp1f4maJSUXZzUrJS3BaeC5a1zxlr_vX1eGpkm9TUaAmMsEALw_wcB"
elif State == "Pennsylvania":
    listing_url = "https://www.zillow.com/pa/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527098975|aud-352785741284:kwd-358071746605|602733267525|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKsZu2Y7DIMGh-Nz-VJvuZBP4cDSfSnzGcQ_roCSimLpXXsWuDbQ2rcaAsirEALw_wcB"
elif State == "Rhode Island":
    listing_url = "https://www.zillow.com/ri/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527099215|aud-457069900685:kwd-458695435848|602733267531|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKsqqc4KaDeu8QlvpLGKlKXcmZIIbB7zIJDE5GpEMJddjSsPUA3vXBkaAm01EALw_wcB"
elif State == "South Carolina":
    listing_url = "https://www.zillow.com/sc/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527099895|aud-1415594728965:kwd-358071749405|649039147856|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKsYkfdpOEg1QS_Ivn5dYC1wnht9i1VnuZ89nIGyoxAkwxIFkyR9lZUaAt1UEALw_wcB"
elif State == "South Dakota":
    listing_url = "https://www.zillow.com/sd/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527097735|aud-834134226151:kwd-459757499215|602733267495|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKuDapjbsNCF1m0y1hjDBlru7oNecPEQ0rmDG1UjT_Ff0A3rrRPP7WAaAmGhEALw_wcB"
elif State == "Tennessee":
    listing_url = "https://www.zillow.com/tn/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527099935|aud-834134226151:kwd-307090939828|649039132319|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKsXbi4r3ztgW9BPlpMvDVEghNuyhe7Odja4rnGvaHTW-PzBt1qLxfgaAtkoEALw_wcB"
elif State == "Texas":
    listing_url = "https://www.zillow.com/tx/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527100655|aud-457069900685:kwd-337260393099|602733267558|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKs4wXWEzeqk5syDdT0JDDSM3lzxapQOE4Vf3yz8Y9h-yUTZV1MVQRoaAjZKEALw_wcB"
elif State == "Utah":
    listing_url = "https://www.zillow.com/ut/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22mapBounds%22%3A%7B%22north%22%3A42.178175596465984%2C%22south%22%3A36.80765046687387%2C%22east%22%3A-107.75674479687501%2C%22west%22%3A-115.33731120312501%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A55%2C%22regionType%22%3A2%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A7%7D"
elif State == "Vermont":
    listing_url = "https://www.zillow.com/vt/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527098455|aud-352785741244:kwd-332330356282|499339726779|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKsQZvt-8CjQyc4RKCb16sfC5vb5bwj7lcp-Nk3kYvO6Ks5ucQkKpR0aAi7AEALw_wcB"
elif State == "Virginia":
    listing_url = "https://www.zillow.com/homes/virginia_rb/?utm_medium=cpc&utm_source=google&utm_content=12364776953|113098131290|aud-298298841046:kwd-329345169521|648926679114|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKs7FRQVuAHlAxqtCsb0Gm9eV5kt556VyCFtnIGLGoAFWMaeDU8tHhEaAh_GEALw_wcB"
elif State == "Washington":
    listing_url = "https://www.zillow.com/wa/?searchQueryState=%7B%22usersSearchTerm%22%3A%22617%20Washintgon%20St%20Erwin%2C%20TN%2037650%22%2C%22mapBounds%22%3A%7B%22north%22%3A52.16693244079027%2C%22east%22%3A-113.30171059375002%2C%22south%22%3A41.942832002083634%2C%22west%22%3A-128.46284340625002%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A6%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A59%2C%22regionType%22%3A2%7D%5D%2C%22pagination%22%3A%7B%7D%7D"
elif State == "West Virginia":
    listing_url = "https://www.zillow.com/wv/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527099015|aud-834134226151:kwd-343272620307|499339727025|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKv_Lh2fnTNywED9MPT4Fc-jVGMGVjmJjiewHdwsevnmOUQJy3jKwmwaAkxHEALw_wcB"
elif State == "Wisconsin":
    listing_url = "https://www.zillow.com/wi/?utm_medium=cpc&utm_source=google&utm_content=19844225958|147527097055|aud-352785740844:kwd-431672404299|602733267291|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKuV3oP5SvdSWeROjt_5scQGYGEmiBW6VnKZ8SVzjunjIh1XiYl7474aAvoHEALw_wcB"
elif State == "Wyoming":
    listing_url = "https://www.zillow.com/homes/wyoming_rb/?utm_medium=cpc&utm_source=google&utm_content=12364776953|113098035970|aud-326276312521:kwd-425587534741|602732519922|&semQue=null&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKtOg8roQ01T9PudSxhYvizEboUWZVyNmk95Il_XejGqt5YijtRyjSsaAp-nEALw_wcB"

listing_response = get_listings(api_key, listing_url)
listing_response.json().keys()
res =listing_response.json()["data"]["cat1"]["searchResults"]["mapResults"]
send_listings(res[0:50])