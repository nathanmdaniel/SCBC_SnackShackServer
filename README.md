# Snack Shack Register

Hello! Welcome to a quick guide to Sandy Creek Bible Camp's Snack Shack program.

## Setting Up

The program supports entering transactions from multiple devices (phones, laptops, etc.). It does this by having all devices connecting to the "SnackShack" network. This network is not connected to the internet but is simply used to connect all the devices being used at a given time.

1. Ensure router is plugged in and turned on
If the router is ready, the light over 2.4Ghz should be lit up.

2. Connect to the Network
Connect using the following credentials.
```
Name: SnackShack
Password: royalstreet006
```
If you connected successfully, your device should say something along the lines of "Connected, No Internet". 

For smartphones, you MUST disable your mobile data for your phone to connect properly. Otherwise, your device will see it is not connected to the internet through the WiFi and use mobile data instead.

One device must be the server device, and I'll explain that in the next step. The important thing for this step is that the server device must have the IP address `192.168.1.2`. The router will give the first device to connect this IP address. If another device is occupying that spot, you can access the router settings page by going to `routerlogin.com` and logging in with the following credentials.
```
Username: admin
Password: password
```
From there, you can kick devices off, change the network's name and password, etc.

3. Start Up the Server on the Server Device
No matter how many devices connect, we want them all to use and make changes to the same spreadsheets. To achieve this, we'll designate one device to be in charge of the spreadsheets. All the other devices will ask this device to recieve information like campers' balances, and they will ask this device to make changes like charging an account for a transaction.



## Understanding the Layout

## Using the Register Page

## Using the Accounts Page

## Working with the Spreadsheets

## Troubleshooting