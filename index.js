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
  function myCvAttach(email,fullname,pnumber,provinces,institution, qualifications,about,skill_1, skill_2, skill_3,workexp,url,workpersonality_1, workpersonality_2, workpersonality_3,driverscodes,languages_1, languages_2, languages_3,nationality,gender) {
  
    let  cv =`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Curriculum Vitae</title>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <style>
    @import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,700&display=swap");
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;
      font-family: "Montserrat", sans-serif;
    }
    
    body {
      /* background: #585c68; */
      font-size: 14px;
      line-height: 22px;
      color: #555555;
    }
    
    .bold {
      font-weight: 700;
      font-size: 20px;
      /* text-transform: uppercase; */
    }
    
    .semi-bold {
      font-weight: 500;
      font-size: 16px;
    }
    
    .resume {
      width: 800px;
      height: auto;
      display: flex;
      margin: 50px auto;
    }
    
    .resume .resume_left {
      width: 280px;
      background: white;
    }
    
    .resume .resume_left .resume_profile {
      width: 100%;
      height: 280px;
    }
    
    .resume .resume_left .resume_profile img {
      width: 100%;
      height: 100%;
    }
    
    .resume .resume_left .resume_content {
      padding: 0 25px;
    }
    
    .resume .title {
      margin-bottom: 20px;
    }
    
    .resume .resume_left .bold {
      color: #0bb5f4;
    }
    
    .resume .resume_left .regular {
      color: #b1eaff;
    }
    .skill_name li{
      font-weight:600;
    }
    .resume .resume_item {
      padding: 25px 0;
      border-bottom: 2px solid #b1eaff;
    }
    
    .resume .resume_left .resume_item:last-child,
    .resume .resume_right .resume_item:last-child {
      border-bottom: 0px;
    }
    
    .resume .resume_left ul li {
      display: flex;
      margin-bottom: 10px;
      align-items: center;
    }
    
    .resume .resume_left ul li:last-child {
      margin-bottom: 0;
    }
    
    .resume .resume_left ul li .icon {
      width: 35px;
      height: 35px;
      background: #fff;
      color: #0bb5f4;
      border-radius: 50%;
      margin-right: 15px;
      font-size: 16px;
      position: relative;
    }
    
    .resume .icon i,
    .resume .resume_right .resume_hobby ul li i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    .resume .resume_left ul li .data {
      color: black;
    }
    
    .data{
      font-weight: 500;
    }
    .resume .resume_left .resume_skills ul li {
      display: flex;
      margin-bottom: 10px;
      color: #b1eaff;
      justify-content: space-between;
      align-items: center;
    }
    
    .resume .resume_left .resume_skills ul li .skill_name {
      width: 25%;
      color:black;
    }
    
    .resume .resume_left .resume_skills ul li .skill_progress {
      width: 60%;
      margin: 0 5px;
      height: 5px;
      background: #009fd9;
      position: relative;
    }
    
    .resume .resume_left .resume_skills ul li .skill_per {
      width: 15%;
    }
    
    .resume .resume_left .resume_skills ul li .skill_progress span {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #fff;
    }
    
    .resume .resume_left .resume_social .semi-bold {
      color: #fff;
      margin-bottom: 3px;
    }
    
    .resume .resume_right {
      width: 520px;
      background: #fff;
      padding: 25px;
    }
    
    .resume .resume_right .bold {
      color: #0bb5f4;
    }
    
    .resume .resume_right .resume_work ul,
    .resume .resume_right .resume_education ul {
      padding-left: 40px;
      overflow: hidden;
    }
    
    .resume .resume_right ul li {
      position: relative;
    }
    
    .resume .resume_right ul li .date {
      font-size: 16px;
      font-weight: 800;
      margin-bottom: 15px;
    }
    
    .resume .resume_right ul li .info {
      margin-bottom: 20px;
    }
    
    .resume .resume_right ul li:last-child .info {
      margin-bottom: 0;
    }
    
    .resume .resume_right .resume_work ul li:before,
    .resume .resume_right .resume_education ul li:before {
      content: "";
      position: absolute;
      top: 5px;
      left: -25px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      border: 2px solid #0bb5f4;
    }
    
    .resume .resume_right .resume_work ul li:after,
    .resume .resume_right .resume_education ul li:after {
      content: "";
      position: absolute;
      top: 14px;
      left: -21px;
      width: 2px;
      height: 115px;
      background: #0bb5f4;
    }
    
    .resume .resume_right .resume_hobby ul {
      display: flex;
      justify-content: space-between;
    }
    
    .resume .resume_right .resume_hobby ul li {
      width: 80px;
      height: 80px;
      border: 2px solid #0bb5f4;
      border-radius: 50%;
      position: relative;
      color: #0bb5f4;
    }
    
    .resume .resume_right .resume_hobby ul li i {
      font-size: 30px;
    }
    
    .resume .resume_right .resume_hobby ul li:before {
      content: "";
      position: absolute;
      top: 40px;
      right: -52px;
      width: 50px;
      height: 2px;
      background: #0bb5f4;
    }
    
    .resume .resume_right .resume_hobby ul li:last-child:before {
      display: none;
    }
    
    
        </style>
    
    </head>
    <body>
    
    
         <div class="resume">
          <div class="resume_left">
           
            <div class="resume_content">
              <div class="resume_item resume_info">
                <div class="title">
                  <p class="bold">${fullname.name}</p>
                  <!-- <p class="regular">Software Engineer</p> -->
                </div>
                <ul>
                  <li>
                    <div class="icon">
                      <i class='bx bxs-directions'></i>
                    </div>
                    <div class="data">
                    ${provinces} <br />
                    </div>
                  </li>
                  <li>
                    <div class="icon">
                      <i class='bx bxs-phone-call'></i>
                    </div>
                    <div class="data">
                      ${pnumber}
                    </div>
                  </li>
                  <li>
                    <div class="icon">
                      <i class='bx bxs-envelope' ></i>
                    </div>
                    <div class="data">
                    ${email}
                      
                    </div>
                  </li>
                  <li>
                     <div class="icon">
                     <i class='bx bxs-id-card'></i>
                    </div> 
                     <div class="data">
                      ${driverscodes}
                    </div>
                  </li>
    
                  <li>
                    <div class="icon">
                      <i class='bx bxs-flag-alt'></i>
                   </div> 
                    <div class="data">
                     ${nationality}
                   </div>
    
                 </li>
                 <li>
                 <div class="icon">
                  <i class='bx bx-extension'></i>
               </div> 
                <div class="data">
                 ${gender}
               </div>
                 </li>
                </ul>
              </div>
              <div class="resume_item resume_skills">
                <div class="title">
                  <p class="bold">Skills </p>
                </div>
                <ul>
                  <li>
                    <div class="skill_name">
                      -${skill_1}
                   
                    
                  </li>
                  <li>
                    <div class="skill_name">
                      -${skill_2}
                   
                    
                  </li>
                  <li>
                    <div class="skill_name">
                      -${skill_3}
                    </div>
                   
                  
                  </li>
                  
                </ul>
              </div>
              <div class="resume_item resume_social">
                 <div class="title">
                  <p class="bold">Languages </p>
                  
                </div>
                <ul>
                  <li>
                    
                    <div class="data">
                      
                      ${languages_1}
                    </div>
                  </li>
                  <li>
                  
                    <div class="data">
                      ${languages_2}
                    </div>
                  </li>
                  <li>
                  
                    <div class="data">
                      ${languages_3}
                    </div>
                  </li>
                
                
                </ul> 
              </div>
            </div> 
         </div>
         <div class="resume_right">
           <div class="resume_item resume_about">
               <div class="title">
                  <p class="bold">Professional Summary</p>
                </div>
               <p>
                ${fullname.name} is an Aspiring.....${fullname.name} always believes 
                that his/her hands-on experience coupled with the growing knowledge he/she gained during 
                his/her studies and during field work prepared his/her to can make a solid contribution in any....${fullname.name} is a 
                self-motivated, goal orientated, driven and an individual who believes in lifting and 
                empowering others, through the knowledge she has acquired, and experiences gained,
    
                ${about}
    
               </p>
           <div class="resume_item resume_work">
               <div class="title">
                  <p class="bold">Employment History</p>
                </div>
               <ul>
                   <li>
                       <div class="date">${workexp}</div> 
                       
                       <div class="info">
                           
                       </div>
                   </li>
                
                   <li>
                  
                    
               
               <div class="title">
                <p class="bold">Interpersonal Skills</p>
              </div>
              <li>
                <div class="date">${workpersonality_1}</div> 
                <div class="date">${workpersonality_2}</div> 
                <div class="date">${workpersonality_3}</div> 
                <div class="info">
                    
                </div>
            </li>
          </ul>
           </div>
           <div class="resume_item resume_education">
             <div class="title">
                  <p class="bold">Education</p>
                </div>
             <ul>
              <li>
                <div class="date">${institution}</div> 
                <div class="info">
                   
                     <p class="semi-bold">${qualifications}</p> 
                </div>
            </li>
       <li>
                     <div class="date">URL</div>
                     <div class="info">
                            <p>${url}</p> 
                         
                       </div>
                   </li>
               </ul>
           </div>
           <div class="resume_item resume_hobby">
            
           </div>
         </div>
       </div>
    
         <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
         <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
    </body>
    </html>`;
    
    
    
    return cv;
  }


 async function buildresume(agent) {
    
    
    //VARIABLE FOR EMPLOYER EMAIL 
    
    
    //VARIABLE FOR BUILDING CV
    //provincegb
  

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


     
    
    console.log(`${fullname.name} + okay ${fullname}`)
    if(url_ori=='none.com'){
      url=' N/A';
    }

    //For Skills
    const valuesArray = skills.toString().split(',');
    let [skill_1, skill_2, skill_3] = valuesArray;

    if (skill_1==null){

      skill_1='';
     }else if(skill_2==null){
  
      skill_2='';
     }else if(skill_3== null){
  
      skill_3='';
     }
  
  

    //For Work Personality
    const valuesArr = workpersonality.toString().split(',');
    let [workpersonality_1, workpersonality_2, workpersonality_3] = valuesArr;




    //For Languague

    const valuesArr_ = languages.toString().split(',');
    let [languages_1, languages_2, languages_3] = valuesArr_;

   if (languages_1==null){

    languages_1='';
   }else if(languages_2==null){

    languages_2='';
   }else if(languages_3== null){

    languages_3='';
   }


    strPDF =myCvAttach(email,fullname,pnumber,provinces,institution, qualifications,about,skill_1, skill_2, skill_3,workexp,url,workpersonality_1, workpersonality_2, workpersonality_3,driverscodes,languages_1, languages_2, languages_3,nationality,gender);
    


  
    // var maillist = [
    // empmail,
    // email,
    // ];

 //   generatePdfAndSendEmail(strPDF,maillist);

 	  // create reusable transporter object using the default SMTP transport
  	 
 //    generatePdfFromHtml(strPDF)
 
      

    const response ='This is the final step. Note: Sending an email to the employer directly might carry some risks.';
    

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

