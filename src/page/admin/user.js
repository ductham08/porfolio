import header_admin from "./header_admin"
import "../../publics/css/admin/list_post.css"


const user_page = {
        async render() {
            const data_admin = await (await fetch("https://porfolio-theta-nine.vercel.app/users?userId=1")).json()
            const data_user = await (await fetch("https://porfolio-theta-nine.vercel.app/users?userId=0")).json()
                // console.log(data_user)
            return /*html*/ `
            <div class= "user_page">
                <div>
                    ${header_admin.render()}
                </div>
                <div class="ctn_article container">
                    <div class="admin">
                        <h5>Admin</h5>
                        <table>
                            <tr>
                                <th class="col-md-2 col-2">Avatar</th>
                                <th class="col-md-1 col-1">Name</th>
                                <th class="col-md-2 col-2">Email</th>
                                <th class="col-md-2 col-2">Role</th>
                            </tr>
                            ${data_admin.map((item) => {
                                return /*html*/ `
                                <tr>
                                    <td><img src="${item.image}" width="100px"></td>
                                    <td>${item.name}</td>
                                    <td>${item.email}</td>
                                    <td>${item.email}</td>
                                </tr>
                                `
                        }).join("")}
                        </table>
                    </div>
            </div>
        `
    }
}

export default user_page