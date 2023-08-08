const nodemailer = require('nodemailer');

module.exports.sendEmail = async (req, res) => {
    const {name, phoneNum, email, message} = req.body;
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'gbrownzzzz58@gmail.com',
            pass: 'upxkvmgdkuvxvmhx',
        },
    });
    const mailOptions = {
        from: email, // Your email address
        to: 'gbrownzzzz58@gmail.com', // Your email address (where you want to receive emails)
        subject: `New Quote Request from ${name}`,
        text: `${message}\n\nContact email: ${email}\n\nPhone Number: ${phoneNum}`,
    };
    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.json({ success: 'Email sent successfully' });
    } catch (error) {
        console.log('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
}


// Once you have created an application-specific password, you can use it to send email from your Google account using Nodemailer. 

// Go to your Google account settings.
// Click on the Security tab.
// Search for App passwords section.
// Click on the Generate new password button.
// Give your application password a name, such as "Nodemailer".
// Click on the Generate button.

// INSERT AT THIS LOCATION 

// auth: {
//     user: 'cho email',
//     pass: 'cho password',
// }