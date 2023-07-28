const nodemailer = require('nodemailer');

module.exports.sendEmail = async (req, res) => {
    const {name, email, message} = req.body;
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ur email',
            pass: 'cho password',
        },
    });
    const mailOptions = {
        from: 'your.email@example.com', // Your email address
        to: 'your.email@example.com', // Your email address (where you want to receive emails)
        subject: `New Contact Form Submission from ${name}`,
        text: `${message}\n\nContact email: ${email}`,
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