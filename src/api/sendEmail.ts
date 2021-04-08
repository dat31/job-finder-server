import nodemailer from 'nodemailer'

// {
//     testAccount: {
//         user: 'zfh5tjukibggcuwd@ethereal.email',
//         pass: 'KvTp2QDwTXCPKPjhn5',
//         smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
//         imap: { host: 'imap.ethereal.email', port: 993, secure: true },
//         pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
//         web: 'https://ethereal.email'
//     }
// }

export default async function sendEmail( to: string, html: string ) {
    const transporter = nodemailer.createTransport( {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "zfh5tjukibggcuwd@ethereal.email", // generated ethereal user
            pass: "KvTp2QDwTXCPKPjhn5", // generated ethereal password
        },
    } );
    const info = await transporter.sendMail( {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to, // list of receivers
        subject: "Change password", // Subject line
        html
    } );
    console.log( "Message sent: %s", info.messageId );
    console.log( "Preview URL: %s", nodemailer.getTestMessageUrl( info ) );
}
