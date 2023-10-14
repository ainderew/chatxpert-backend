const htmlMailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        body{
            background-color: #f6f6f6;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%; 
            width: 50%;
            line-height: 24px;
            box-shadow: 10px 10px lightblue;
            border: black solid 1px; 
            margin: 1rem;
        }
        img{
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width:50px;
            max-height:50px;
            padding:10px;
        }
        div{
            padding:20px
        }
        .headercontainer{
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            gap: 1rem;
            margin:1rem;
        }
        .headertext{
            font-weight: bold;
            padding:5px;
        }
        article{
            padding: 1rem;
        }
        .articlehead{
            padding-inline: 1rem;
        }
        .buttoncontainer{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 1rem;
        }
        button{
            background-color: dodgerblue;
            border: 0;
            color: white;
            padding: .4rem 3rem;
            font-size:medium;
            border-radius: 5px;

        }
        footer{
            background-color: dodgerblue;
            font-size: smaller;
            color:white;
            padding: 1.5rem;
        }
      </style>
</head>
<body>
    <div>
        <header class="headercontainer">
            <a href="https://cap-client-two.vercel.app/" target="_blank">
                <img src="https://i.ibb.co/MBrjsCp/logo.png" alt="logo" border="0" />
            </a>
            <h2 class="headertext">BRAMK</h2>
        </header>
        <h3 class="articlehead">Friendly Reminder:</h3>
        <hr>
        <article>
            <section class="contenttext">
                Welcome to the first day of the month! 
                We value your presence on our platform and are committed 
                to providing you with the best service possible. 
                To ensure the accuracy of the information your provided, we kindly 
                request your assistance in reviewing and updating your uploaded information promptly.
            </section>
            <section class="buttoncontainer">
                <a href="https://cap-client-two.vercel.app/login" target="_blank"><button>Update Data Now</button></a>
            </section>
            <section class="contenttext">
                Your efforts will enhance the accuracy of our insights and services, 
                resulting in a smoother experience for all users. 
                Thank you for your cooperation and trust in BRAMK.
            </section>
            <section class="contenttext">
                <br>
                <br>
                Best regards,
                <br>
                Your Friends at <b>
                    BRAMK
                </b>
            </section>
        </article>
        <footer class="footer">
            You received this email because you registered to <b>BRAMK</b>.
            <br>
            If you have any questions or require assistance during this process, please don't 
            hesitate to reach out to our support team. We're here to help you every step of the way.
        </footer>
    </div>
</body>
</html>
`

export default htmlMailTemplate