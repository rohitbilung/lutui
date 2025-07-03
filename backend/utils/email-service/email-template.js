const userSubject = "Thank You for Registering with [Your Company Name]";
const userText = `Dear Customer,

Thank you for registering with [Your Company Name], your trusted real estate property dealer. Our team will contact you soon to assist with your property needs.

If you wish to reach us directly, please call us at [Your Contact Number].

Best regards,
[Your Company Name] Team`;

const userHtml = `
    <p>Dear Customer,</p>
    <p>Thank you for registering with <strong>[Your Company Name]</strong>, your trusted real estate property dealer. Our team will contact you soon to assist with your property needs.</p>
    <p>If you wish to reach us directly, please call us at <strong>[Your Contact Number]</strong></a>.</p>
    <p>Best regards,<br/>[Your Company Name] Team</p>
`;


const adminSubject = "New User Registration - [Your Company Name]";
const adminText = `Hello Admin,

    A new user has registered on the platform. Please find the details below:

    Name: [User Name]
    Email: [User Email]
    Phone: [User Phone]

    Please get in touch with the user at your earliest convenience.

    Regards,
    Website Notification`;

const adminHtml = `
    <p>Hello Admin,</p>
    <p>A new user has registered on the platform. Please find the details below:</p>
    <ul>
        <li><strong>Name:</strong> [User Name]</li>
        <li><strong>Email:</strong> [User Email]</li>
        <li><strong>Phone:</strong> [User Phone]</li>
    </ul>
    <p>Please get in touch with the user at your earliest convenience.</p>
    <p>Regards,<br/>Website Notification</p>
`;

module.exports = {
    userSubject,
    userText,
    userHtml,
    adminSubject,
    adminText,
    adminHtml
};