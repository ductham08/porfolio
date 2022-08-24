import "../publics/css/banner.css"
import avatar from "../publics/images/avatar.jpg"

const banner = {
        async render() {
            const data_user = await (await fetch("http://localhost:3001/user")).json()
            return /*html*/ `
            <div class="banner container">
                ${data_user.map((item_user) => {
                    return /*html*/`
                        <div class="img_pro col-md-4 col-12">
                            <img src="${item_user.image}" width="100%"  alt="">
                        </div>
                        <div class="text_pro col-md-8 col-12">
                            <h4>Hi, i am ${item_user.name}</h4>
                            <h5>${item_user.position}</h5>
                            <p>${item_user.desc}</p>
                            <a href="#">Dowload Resume</a>
                        </div>
                        `
                    })}
            </div>
        `
    }
}

export default banner