import nodemailer from 'nodemailer'

// {
//     testAccount: {
//         user: 'zfh5tjukibggcuwd@ethereal.email',
//             pass: 'KvTp2QDwTXCPKPjhn5',
//             smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
//         imap: { host: 'imap.ethereal.email', port: 993, secure: true },
//         pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
//         web: 'https://ethereal.email'
//     }
// }

export default async function sendEmail( to: string, html: string ) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // const testAccount = await nodemailer.createTestAccount();

    // console.log( { testAccount } )

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport( {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "zfh5tjukibggcuwd@ethereal.email", // generated ethereal user
            pass: "KvTp2QDwTXCPKPjhn5", // generated ethereal password
        },
    } );

    // send mail with defined transport object
    const info = await transporter.sendMail( {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to, // list of receivers
        subject: "Change password", // Subject line
        html
    } );

    console.log( "Message sent: %s", info.messageId );
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log( "Preview URL: %s", nodemailer.getTestMessageUrl( info ) );
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
