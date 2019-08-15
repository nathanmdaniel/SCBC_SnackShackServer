# Snack Shack Register

Hello! Welcome to a quick guide to Sandy Creek Bible Camp's Snack Shack program.

## Setting Up

The program supports entering transactions from multiple devices (phones, laptops, etc.). It does this by having all devices connecting to the "SnackShack" network. This network is not connected to the internet but is simply used to connect all the devices being used at a given time.

1. Ensure router is plugged in and turned on
   - If the router is ready, the light over 2.4Ghz should be lit up.

2. Connect to the Network
   - Connect using the following credentials.

    ```
    Name: SnackShack
    Password: royalstreet006
    ```
   - If you connected successfully, your device should say something along the lines of "Connected, No Internet". 

   - For smartphones, you MUST disable your mobile data for your phone to connect properly. Otherwise, your device will see it is not connected to the internet through the WiFi and use mobile data instead.

   - One device must be the server device, and I'll explain that in the next step. The important thing for this step is that the server device must have the IP address `192.168.1.2`. The router will give the first device to connect this IP address. If another device is occupying that spot, you can access the router settings page by going to `routerlogin.com` and logging in with the following credentials.

    ```
    Username: admin
    Password: password
    ```
   - From there, you can kick devices off, change the network's name and password, etc.

3. Start Up the Server on the Server Device
   - No matter how many devices connect, we want them all to use and make changes to the same spreadsheets. To achieve this, we'll designate one device to be in charge of the spreadsheets. All the other devices will ask this device to recieve information like campers' balances, and they will ask this device to make changes like charging an account for a transaction.

   - There are a few requirements of the server device. For this section, the most important thing is that the device must be a computer, not a phone. We'll go into the rest in a loter section.

   - To get the server running, double click the file `RunServer.bat`. It will take a moment to get things going, but you are looking for a line that says `Ready on http://192.168.1.2:3001`. Once that message appears, devices can begin accessing the site. To turn off the server, you can simply close this window.

4. Accessing the Site
   - Use your web browser and go to `http://192.168.1.2:3001` for the main landing or `http://192.168.1.2:3001/RegisterPage` to go straight to the register.

## Understanding the Layout
There are two primary pages on this site. Firstly, the register page is used to record orders campers make. The other page is the accounts page. It is used for adding to a camper's balance. You can navigate between these pages by using the menu bar on the top left corner.

![MenuScreen](./screenshots/MenuScreen.png)

## Using the Register Page
There are two sides to the register page. On the left are the buttons for the various items up for sale at the Snack Shack. They are divided into four categories: merchandise, food (candy, chips, etc.), drinks, and ice cream. The right side describes the current transaction.

As you click buttons on the left side they will appear in the white, blank area of the right side. Below this is a search bar to input the camper's name. If the camper with that name has been found, their remaining balance will be listed in black to the right of their name. This search has autocomplete, so you can start typing either the first or last name and matches will immediately pop up. The red button can be used to remove items from the transaction. By default, it removes the last item from the list. However, you can also select an item to be removed. The green button is used to send the finalized transactions.


## Using the Accounts Page
There are two actions you can do on this page: create a new account and credit an existing account. These work as you would expect. Once again, the search bar for the existing account has autocomplete, so you can start typing either the first or last name and matches should start popping up.

## Working with the Spreadsheets

## Troubleshooting