import pandas as pd
import utils
import sys

api_key = "83263f0b-2414-49d7-a2d6-a80931377aa7"
State = sys.argv[1]
listing_url = utils.getState(State)
listing_response = utils.get_listings(api_key, listing_url)

if listing_response.json()['is_success']:
    df_listings = pd.json_normalize(listing_response.json()["data"]["cat1"]["searchResults"]["mapResults"])
    ##filter listings 
    maxPrice = float(sys.argv[2])
    numBeds = int(sys.argv[3])
    numBaths = int(sys.argv[4])

    df_filtered = df_listings[(df_listings["hdpData.homeInfo.price"] < maxPrice) & (df_listings["hdpData.homeInfo.bathrooms"] == numBaths) & (df_listings["hdpData.homeInfo.bedrooms"] == numBaths) & (df_listings["detailUrl"])]

    ##create dataframe with information 
    for i in df_filtered:
        filteredURL = df_filtered["detailUrl"]
        filteredPrice = df_filtered["price"]

    house_matched = pd.DataFrame({'URL': filteredURL, 'PRICE': filteredPrice})

    ##Mortgage Calculations
   
    
    maxMonthlyPayment = float(sys.argv[5])
    downPayment = float(sys.argv[6])
    propTax = float(sys.argv[7])
    hInsurance = float(sys.argv[8])
    loanYears = int(sys.argv[9])
    interestRate = float(sys.argv[10])
    

    PMI = 0
    HOA = 0
    homePrice = 0

    final = []

    def getMortgage(homePrice, downPayment, loanYears, interestRate, propTax, hInsurance, PMI, HOA):
        P = homePrice - downPayment
        N = loanYears * 12
        i = interestRate / 100 / 12
        a = pow((1+i),N)
        b = P * i * a
        c = a - 1
        principleInterest = b/c
        principleInterest = round(principleInterest)
        Mortgage = principleInterest+propTax+hInsurance+PMI+HOA 
        return Mortgage

    homePrice = house_matched["PRICE"].to_numpy()

    for i in homePrice:
        x = i.replace(",", "")
        y = x.replace("$", "")
        houseMortgage = getMortgage(int(y), downPayment, loanYears, interestRate, propTax, hInsurance, PMI, HOA)
        if(houseMortgage <= maxMonthlyPayment):
            finalURL = house_matched["URL"]

    finalHouses = pd.DataFrame({'URL': finalURL})
    finalHouses = finalHouses.to_numpy()

    for i in finalHouses:
        x = "https://www.zillow.com" + i[0]
        final.append(x)

    listToStr = '\n'.join([str(elem) for elem in final])

    ##send emails 

    from email.message import EmailMessage
    import ssl
    import smtplib

    email_sender = "restateinvesthub@gmail.com"
    email_password = "exmrdpedpspjztib"
    email_receiver = sys.argv[11]
    print(email_receiver)

    Subject = "New House Matches for You"
    Body = "Here is a list of address that matched your criteria:\n\n " + listToStr

    em = EmailMessage()
    em['From'] = email_sender
    em['To'] = email_receiver
    em['Subject'] = Subject
    em.set_content(Body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email_sender, email_password)
        smtp.sendmail(email_sender, email_receiver, em.as_string())
        print("email-sent")
