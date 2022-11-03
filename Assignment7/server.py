 # created by Vishal Kumar Anand (201951170)
from spyne import Application, rpc, ServiceBase, Iterable, Integer, String, Unicode, AnyXml, AnyDict, Decimal
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
from pymongo import MongoClient
import lxml

# creating and connecting to MongoDB database
try:
    connect = MongoClient()
    print("Database is connected")
except:
    print("Database could not be connected")

db = connect.CustomerDB
collection = db.CustomerCollection

# SOAP protocol implementation


class CustomerService(ServiceBase):
    # inserting data into the database
    @rpc(Integer, Unicode, Unicode, Unicode, Integer, Integer, _returns=Unicode)
    def insert_record(ctx, CustomerID, CustomerFN, CustomerLN, CustomerEmail, CustomerMobile, CustomerBalance):
        record = {
            "customerID": CustomerID,
            "customerFirstName": CustomerFN,
            "customerLastName": CustomerLN,
            "customerEmail": CustomerEmail,
            "customerMobile": CustomerMobile,
            "customerBalance": CustomerBalance
        }

        collection.insert_one(record)

    # reading data from the database
    @rpc(_returns=Iterable(AnyDict))
    def find_records(ctx):
        cursor = collection.find()
        array = []
        for record in cursor:
            array.append(record)
        return array

    # deleting data from the database
    @rpc(_returns=Iterable(Unicode))
    def delete_recs(ctx):
        collection.delete_many({})
        print('Data deleted successfully')


app = Application([CustomerService], 'spyne.examples.hello.soap',
                  in_protocol=Soap11(validator='lxml'), out_protocol=Soap11())

wsgi_app = WsgiApplication(app)

if __name__ == '__main__':
    import logging
    from wsgiref.simple_server import make_server

    logging.info('server is listening')
    logging.info('wsdl is listening')
    server = make_server('0.0.0.0', 8000, wsgi_app)
    server.serve_forever()
