import banner from "../layout/banner"
import footer from "../layout/footer"
import header from "../layout/header"
import "../publics/css/contact_page.css"

const contact_page = {
        async render() {
            const data_contact = await (await fetch("http://localhost:3001/contact")).json()
            return /*html*/ `
            <div class="ctn_contact">
                <div class="header">
                    ${header.render()}
                </div>
                <div>
                    ${await banner.render()}
                </div>
                <div class="article">
                <hr>
                    <div class="container">
                        <div class="form_contact col-md-5 col-12">
                            <h5>Contact for work</h5>
                            <p>All of your information is confidential and we will contact you as soon as we receive it. Thank you!</p>
                            <form id="form_contact" class="form_contact">
                                <input type="text" placeholder="Name" class="name_contact" id="name_contact">
                                <input type="text" placeholder="Email" class="email_contact" id="email_contact">
                                <input type="text" placeholder="Phone number" class="phone_contact" id="phone_contact">
                                <textarea name="" id="content_contact"  rows="5" placeholder="Content"></textarea>
                                <button class="btn_send_contact" id="btn_send_contact">Send</button>
                            </form>
                        </div>
                        <div class="info_contact col-md-5 col-12">
                            <h5>Contact info</h5>
                            <p>You can also contact us via the information below</p>
                            ${data_contact.map((item)=>{
                                return /*html*/`
                                    <p>Phone number: <i>${item.phone}</i></p>
                                    <p>Email: <i>${item.email}</i></p>
                                    <p>Address: <i>${item.address}</i></p>
                                `
                            })}
                            <a class="link_contact" href="#"><i class="fa-brands fa-facebook-f"></i></a>
                            <a class="link_contact" href="#"><i class="fa-brands fa-instagram"></i></a>
                            <a class="link_contact" href="#"><i class="fa-brands fa-github"></i></a>
                        </div>
                    </div>
                <hr>
                </div>
                <div class="ctn_footer">
                    ${footer.render()}
                </div>
            </div>
        `
    }
}

export default contact_page