const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

// const { PDFDocument } = require('pdf-lib');

const htmlToPDF = require('html-pdf');
const PDFDocument = require('pdfkit');
const doc = new PDFDocument();

const fs = require('fs');
const puppeteer = require('puppeteer');

const path = require("path");



const { WebhookClient } = require("dialogflow-fulfillment");
let  strPDF='';



app.get("/", (req, res) => {
  res.send("Hi from server!");
});

app.post("/", express.json(), (req, res) => {

  

  async function generatePdfAndSendEmail(html,maillist) {
    // Launch a headless browser
    const browser = await puppeteer.launch({
      headless: 'new'
    });
    const page = await browser.newPage();
  
    // Set the content of the page to the HTML string
    await page.setContent(html);
  
    // Generate the PDF and store it in a buffer
    const pdfBuffer = await page.pdf({ format: 'A4' });
  
    // Close the browser
    await browser.close();
  
  
  
  
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "mail.softmeet.co.za",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'support@softmeet.co.za', // your cPanel email address
        pass: '6Tn8)Iq6q-iI', // your cPanel email password
    }
    });
  
    // Define the email message
    if (!maillist || maillist.length === 0) {
      throw new Error('No recipient email addresses defined!');
    }
        let info = transporter.sendMail({
          from: '"SoftMeet Application Bot - " <support@softmeet.co.za>', // sender address
          to: maillist, // list of receivers
          subject: "Application CV", // Subject line
          html: "Dear Sir/Madam, <br><br> Please find my CV attached, If there's any additional information you need, I hope to hear from you soon.<br><br>Kind Regards.",        
          attachments: [{
            filename: 'myCvAttach.pdf',//'example.pdf',
            content: pdfBuffer,
              
          }]      
    
          });
          
    // Send the email
    
    try {
      // Send the email
      await transporter.sendMail(info);
      console.log('Email sent successfully!');
     
    } catch (error) {
     // console.error(error);
    }
    
  
  
  }
  


  
  const agent = new WebhookClient({ request: req, response: res });

  //THIS IS THE CV INCASE YOU WANT TO CHANGE IT IN THE FUTURE
  function myCvAttach(email,fullname,pnumber,provinces,institution, qualifications,about,skills,workexp,url,workpersonality,driverscodes,languages,nationality,gender) {
  
    let  cv =`<!DOCTYPE html>
    <html>
    <head>
        <style>
            
    @import url('https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap');
    *
    {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    }
    body
    {
    
    
    }
    .container
    {
        // position: relative;
        width: 100%;
        max-width: 1000px;
        min-height: 1000px;
        
        margin-left: 50px;
        align-items:center;
        align:center;
     
    }
    .container .left_Side
    {
        // position: relative;
        background: #808080;
        padding: 15px;
        margin-left:20%;
  
    }
    .profileText
    {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        // padding-bottom: 10px;
        border-bottom: 1px solid rgba(255,255,255,0.2);
    }
    .profileText .imgBx
    {
       position: relative;
       width: 200px;
       height: 200px;
       border-radius: 50%;
       overflow: hidden; 
    }
    .profileText .imgBx img
    {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .profileText h2
    {
        color: #fff;
        font-size: 1.5em;
        margin-top: 20px;
        text-transform: uppercase;
        text-align: center;
        font-weight: 600;
        line-height: 1.4em;
    }
    .profileText h2 span
    {
        font-size: 0.8em;
        font-weight: 300;
    }
    .contactInfo
    {
        padding-top: 8px;
    }
    .title
    {
        color:#fff;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 1px;
        margin-bottom: 10px;
    }
    .contactInfo ul
    {
        position: relative;
    }
    .contactInfo ul li
    {
        position: relative;
        list-style: none;
        margin: 10px 0;
        cursor: pointer;
    }
    .contactInfo ul li .icon
    {
        display: inline-block;
        width: 30px;
        font-size: 15px;
        color: #03a9f4;
    }
    .container ul li span
    {
        color:#fff;
        font-weight: 300;
    }
    .education li
    {
        margin-bottom: 15px;
    }
    .education h5
    {
        color: #03a9f4;
        font-weight: 500;
    }
    .education h4:nth-child(2)
    {
        color: #fff;
        font-weight: 500;
    }
    .education h4
    {
        color: #fff;
        font-weight: 300;
    }
    .container .right_Side
    {
        position: relative;
        background: #fff;
        padding: 30px;
    }
    .about
    {
        margin-bottom: 30px;
    }
    .about:last-child
    {
        margin-bottom: 0;
    }
    .title2
    {
        color:#003147;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 10px;
    
    }
    p
    {
        color: #333;
    }
    .about .box
    {
        display: flex;
        flex-direction: row;
        margin: 20px 0;
    }
    .about .box .year_company
    {
        min-width: 150px;
    }
    .about .box .year_company h5
    {
        text-transform: uppercase;
        color: #848c90;
        font-weight: 600;
    }
    .about .box .text h4
    {
        text-transform: uppercase;
        color: #2a7da2;
        font-size: 16px;
    }
    .skills .box
    {
      position: relative;
      width: 100%;
      display: grid;
      grid-template-columns: 150px 1fr;
      justify-content: center;
      align-items: center;
    }
    .skills .box h4
    {
      text-transform: uppercase;
      color: #848c99;
      font-weight: 500;
    }
    .row
    {
        
        
    }
    
    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive CV using HTML & CSS</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" type="text/css" href="style.css">
    
    
    
    </head>
    
    <body>
    <div class="container">
    <div class="left_Side">
    <div class= "ProfileText">
    
    <h2 style="">Resume Of <br> ${fullname}</h2>
    </div>
    
    <div class="contactInfo">
    <h3 class="title"  >Contact Info</h3>
    
        <div class="row" >
            
                <span class="icon" ><i class="fa fa-phone" aria-hidden="true"></i>
                </span>
                <span class="text">${pnumber}</span>
            
            
                <span class="icon" style="";><i class="fa fa-envelope-o" aria-hidden="true"></i>
                </span>
                <span class="text">${email}</span>
           
                
           
        </div>
    
    </div>
    
    </div>
    
    <div class="right_Side">
      <div class="about">
        <h2 class="title2">Profile</h2>
        <p>
            ${about}
        </p>
      </div>
    
      
      <div class="about skills">
      <h2 class="title2">Personal Details</h2>
      -<b>Gender</b>: ${gender}<br>-<b>License</b>:${driverscodes}<br>-<b>Nationality</b>: ${nationality}<br>-<b>Province </b>${provinces}<br>-<b>Online Profile/Portfolio</b>: ${url}
    </div>
    
    
      <div class="about skills">
      <h2 class="title2">Academic Record</h2>
      -${institution}<br>-${qualifications}
    </div>
    
      
      
      <div class="about">
        <h2 class="title2">Employment History</h2>
            <div class="box">
                <div class="text">
                    <p>${workexp}</p>
                </div>
            </div>
        <div class="about skills">
          <h2 class="title2">Skills</h2>
          -${skills}<br>-${workpersonality}
        </div>
    
        <div class="about skills">
          <h2 class="title2">Languages</h2>
          English,${languages}
      </div>
    
    
      </div> 
    </div>
    </div>
    </body>
    </html>`;
    
    
    
    return cv;
  }


 async function buildresume(agent) {
    
    
    //VARIABLE FOR EMPLOYER EMAIL 
    
    
    //VARIABLE FOR BUILDING CV
    let fullname = req.body.queryResult.parameters['fullname'];
    let provinces =req.body.queryResult.parameters['provincegb'];  
    let pnumber = req.body.queryResult.parameters['pnumber'];
    let workexp = req.body.queryResult.parameters['workexp'];
    let workpersonality = agent.parameters['workpersonality'];
    let driverscodes = agent.parameters['driverscodes'];
    let nationality = agent.parameters['nationality']
    let languages = agent.parameters['languages'];
    let email = req.body.queryResult.parameters['email'];
    let skills = req.body.queryResult.parameters['skills'];
    let qualifications = req.body.queryResult.parameters['qualifications'];
  	let institution = req.body.queryResult.parameters['institution'];
    let url_ori=req.body.queryResult.parameters['url'];

    let about= req.body.queryResult.parameters['about'];
    let gender= req.body.queryResult.parameters['gender'];
    
    var url;
    
    if(url_ori=='none.com'){
      url=' N/A';
    }

    strPDF =myCvAttach(email,fullname,pnumber,provinces,institution, qualifications,about,skills,workexp,url,workpersonality,driverscodes,languages,nationality,gender);
    


  
    // var maillist = [
    // empmail,
    // email,
    // ];

 //   generatePdfAndSendEmail(strPDF,maillist);

 	  // create reusable transporter object using the default SMTP transport
  	 
 //    generatePdfFromHtml(strPDF)
 
      

    const response ='Thank you for creating a CV using SoftMeeet CV builder Bot. The CV is complete, check your email address.';
    

    agent.add(response);
  }
  
  
  
  async function sayHello(agent) {


      const HelloRes=`Hello!👋 My name is Pam, and I'm your friendly CV builder. To get started, simply type "create".`;
      
      agent.add(HelloRes);

  }

  async function sendcv(agent){

    console.log(strPDF);
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    let eMail = req.body.queryResult.parameters['eMail'];
    generatePdfAndSendEmail(strPDF,eMail);
    const fRes=`Thank your for using Softmeet CV builder 😁`;
      
    agent.add(fRes);

    
  }
  

  async function sendtoself(agent){

    
    let pMail = req.body.queryResult.parameters['pMail'];
    generatePdfAndSendEmail(strPDF,pMail);
    const fRes=`Thank your for using Softmeet CV builder 😁`;
      
    agent.add(fRes);

    
  }
  

  const intentMap = new Map();
  intentMap.set("buildresume", buildresume);
  intentMap.set("sayHello", sayHello);
  intentMap.set("sendcv",sendcv); //sendtoself
  intentMap.set("sendtoself",sendtoself); //sendtoself

  agent.handleRequest(intentMap);
});

app.listen(8080, () => {
  console.log("server running...on port 8080");
});

