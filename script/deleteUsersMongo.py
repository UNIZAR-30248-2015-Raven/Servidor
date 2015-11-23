# -*- encoding: utf-8 -*-
from pymongo import MongoClient
#Instalar pymongo: pip install pymongo

client = MongoClient("mongodb://raven:raven@ds041144.mongolab.com:41144/raven")
db = client.raven
db.users.delete_many({});
print "Delete Users"
