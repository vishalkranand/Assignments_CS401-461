#created by Vishal Kumar Anand (201951170)

from pickletools import float8
from suds.client import Client
hello_client = Client('http://localhost:8000/?wsdl')
print("1. Enter new data")
print("2. Display All Data")
print("3. Delete All data")
print("Enter your choice: ", end=' ')
choice = int(input())
print(choice)
customerID = 0
if choice == 1:
    customerID += 1
    customerFN = input("Enter First Name: ")
    customerLN = input("Enter Last Name: ")
    customerEmail = input("Enter Email: ")
    customerMobile = int(input("Enter Phone Number: "))
    customerBalance = int(input("Enter Balance: "))
    msg = hello_client.service.insert_record(
        1, customerFN, customerLN, customerEmail, customerMobile, customerBalance)
    print(msg)
elif choice == 2:
    data = hello_client.service.find_records()
    for record in data:
        print(record)
else:
    hello_client.service.delete_recs()
