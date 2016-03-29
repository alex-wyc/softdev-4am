import json, urllib2, urllib
from base64 import b64encode


def apirequest(url, auth, post):
    """
    params:
          url:  string, request url
          auth: string, authentification token
          post: boolean, true = post request, false = get
    return:
          json
    """
    heads = {'Host':'api.twitter.com',
             'User-Agent':'TwitsonLD',
             'Authorization': auth}
    data = None
    if post:
        data = {'grant_type':'client_credentials',
                'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        data = urllib.urlencode(data)
    req = urllib2.Request(url, data, headers = heads)
    try:
        return urllib2.urlopen(req).read()
    except urllib2.HTTPError, error:
        return error.read()

def getToken():
    """
    return:
         string,
         authentification token from twiter
    """
    #authentication keys
    apikey = "SOpevOakpUrEQhmvyUXjR3qQ6"
    apisecret = "ccK8U0k7VFuoo0mQ8IxVgrw7NMEFRdyvWfDqjxc70YWGYDEpCN"
    key = b64encode(apikey + ":" + apisecret)
    authurl = "https://api.twitter.com/oauth2/token/"
    #requst authorization token
    token = json.loads(apirequest(authurl, "Basic " + key, True))
    tokenauth = "Bearer " + token['access_token'] #used to authorize api requests
    return tokenauth

def getUserTweets(user):
    """
    params:
          user: string, twitter handle
    return:
          string,
          returns most recent 200 tweets
          does not include retweets and replies
    """
    uri = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=%s&count=200"
    url = uri%(user)
    results = json.loads(apirequest(url, getToken(), False))
    #pretty = json.dumps(results, sort_keys=True, indent=4)#for testing
    if 'errors' in results:
        error = results['errors'][0]
        print "error occured"
        #raises error containg error message sent from twitter
        #i.e. if the user doesn't exist
        raise ValueError(error['message'])
    tweets = ""
    print "results: " + str(len(results))
    for post in results:
        tweets += "\n" + post['created_at'].split(' ')[3].split(':')[0]
    return tweets

candidates = ["BernieSanders", "realDonaldTrump", "HillaryClinton", "tedcruz", "JohnKasich"]
f = open("data.csv", "w")
s = "Time,"

candidate_tweets = {} # b/c python > js

for cand in candidates:
    s += cand + ','
    candidate_tweets[cand] = [0] * 24
    text = getUserTweets(cand)
    for line in text.split("\n"):
        if len(line) != 0:
            candidate_tweets[cand][int(line)] += 1

s = s[:-1] + '\n'

for i in range(0, 24):
    s += str(i) + ','
    for cand in candidates:
        s += str(candidate_tweets[cand][i]) + ','
    s = s[:-1] + '\n'

f.write(s)
