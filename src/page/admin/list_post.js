import header_admin from "./header_admin"
import "../../publics/css/admin/list_post.css"
import { re_load } from "../../ultil/re_load"
import { Ls } from "dayjs"

const list_post_page = {
        async render() {
            const data = await (await fetch("https://porfolio-theta-nine.vercel.app/posts?_expand=category_Post")).json()
            return /*html*/ `
        <div class="ctn_list_post">
            <div>
                ${header_admin.render()}
            </div>
            <div class="ctn_article">
                <table>
                    <tr>
                        <th class="col-md-1 col-1">Id</th>
                        <th class="col-md-2 col-2">Title</th>
                        <th class="col-md-1 col-2">Category</th>
                        <th class="col-md-5 col-5">Content</th>
                        <th class="col-md-1 col-2">Createat</th>
                        <th class="col-md-2 col-2">
                            <button><a href="/admin/post/add">Add</a></button>
                        </th>
                    </tr>
                    ${data.map((item) => {
                        return /*html*/ `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.title}</td>
                            <td>${item.category_Post.name}</td>
                            <td class="content">${item.content}</td>
                            <td>${item.createat}</td>
                            <td>
                                <button value="${item.id}" id="btn_remove_post">Remove</button>
                                <button><a href="/admin/post/edit/${item.id}">Edit</a></button>
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
                const confirm = window.confirm(`Ban co muon xoa bai post so ${id_btn}`)
                if(confirm){
                    const data = await fetch(`https://porfolio-theta-nine.vercel.app/posts/${id_btn}`,{
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

export default list_post_page