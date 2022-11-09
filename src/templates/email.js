const nodemailer = require('nodemailer');
require('dotenv').config();


this.enviar_mail = (destinatarios,mensaje) => {
    console.log(destinatarios,mensaje);
    // return;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPSSWD
        }
    });
    var newEmail = destinatarios.map(function(d) {
        let mail_options = {
            from: 'rjimenez.fenixcloud@gmail.com',
            to: d,
            subject: 'Siendo vos me contrataria!',
            html: `
                <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
                    <tr height="200px">  
                        <td bgcolor="" width="600px">
                            <h1 style="color: #fff; text-align:center">Bienvenido</h1>
                            <p  style="color: #fff; text-align:center">
                                <span style="color: #fff">${mensaje}</span>
                            </p>
                        </td>
                    </tr>
                    <tr bgcolor="#fff">
                        <td style="text-align:center">
                            <p style="color: #000">¡Prueba exitosa!</p>
                        </td>
                    </tr>
                </table>
            `
        };
        transporter.sendMail(mail_options, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('El correo se envío correctamente ' + info.response);
                
            }
        });
    
    });
};
module.exports = this;