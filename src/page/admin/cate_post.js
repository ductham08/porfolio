import header_admin from "./header_admin"
import "../../publics/css/admin/list_post.css"
import { re_load } from "../../ultil/re_load"

const cate_post_page = {
        async render() {
            const data = await (await fetch("https://porfolio-theta-nine.vercel.app/category_Posts")).json()
            return /*html*/ `
        <div class="ctn_list_post">
            <div>
                ${header_admin.render()}
            </div>
            <div class="ctn_article container">
                <table>
                    <tr>
                        <th class="col-md-4 col-4">Id</th>
                        <th class="col-md-4 col-4">Name</th>
                        <th class="col-md-4 col-4">
                            <button><a href="/admin/categorypost/add">Add</a></button>
                        </th>
                    </tr>
                    ${data.map((item) => {
                        return /*html*/ `
                        <tr>
                            <td>${item.id}</td>
                            <td><a href="/admin/categorypost/detail/${item.id}">${item.name}</a></td>
                            <td>
                                <button value="${item.id}" id="btn_remove_post">Remove</button>
                                <button><a href="/admin/categorypost/edit/${item.id}">Edit</a></button>
                            </td>
                        </tr>
                        `
                    }).join("")}
                </table>
            </div>  
        </div>
        `
    }, after_Render(){
        const btn_remove = document.querySelectorAll("#btn_remove_post")
        for (const btn of btn_remove) {
            const id_btn  = btn.value
            btn.addEventListener("click", async ()=>{
                // Call api
                const confirm = window.confirm(`Ban co muon xoa danh muc so ${id_btn}`)
                if(confirm){
                    const data = await fetch(`https://porfolio-theta-nine.vercel.app/category_Posts/${id_btn}`,{
                        method:"DELETE"
                    })
                    if(data){
                        re_load("app", list_post_page)
                        console.log("xoa thanh cong")
                   }
                }
            })
        }
    }
}

export default cate_post_page