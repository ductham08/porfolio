import "../../publics/css/admin/edit_user.css"
import { uploadFile } from "../../../upload_img"


const edit_user = {
        async render() {
            const data_user = await (await fetch("http://localhost:3001/user")).json()
            return /*html*/ `
        <div class=" ctn_edit_user">
           <div class="container ctn_article col-md-10 col-12">
                ${data_user.map(item => {
                    return /*html*/ `
                    <p>Welcome ${item.name}!</p>
                    <div>
                        <img class="avatar" width="100%"  id="avatar" src="${item.image}" alt="">
                    </div>
                    <form id="edit_user_form">
                        <p>Name:</p>
                        <input type="text" value="${item.name}" placeholder="Name" id="name">
                        <p>Position:</p>
                        <input type="text" value="${item.position}" placeholder="Position" id="position">
                        <p>Age:</p>
                        <input type="text" value="${item.age}" placeholder="Age" id="age">
                        <p>Cv:</p>
                        <input type="text" value="${item.cv}" placeholder="Cv" id="cv">
                        <p>Image:</p>
                        <input type="file" src="${item.image}" placeholder="" class="img_file" id="image">
                        <p>Description:</p>
                        <textarea id="desc"  rows="10" placeholder="Description">${item.desc}</textarea>
                        <button>Save</button>
                    </form>
                    `
                })}
           </div>
        </div>
        `
    }, after_Render(){
        const form = document.getElementById("edit_user_form")
        const name = document.getElementById("name")
        const postision = document.getElementById("position")
        const age = document.getElementById("age")
        const cv = document.getElementById("cv")
        const image = document.getElementById("image")
        const desc = document.getElementById("desc")
        const avatar = document.getElementById("avatar").getAttribute('src')

        form.addEventListener("submit", async (e)=> {
            e.preventDefault()

            async function url() {
                if(image.files[0]){
                    const response = await uploadFile(image.files[0]);
                    return response.data.url
                }
                else{
                    return avatar
                }
            }
            
            
            // function url(){
            //     if(avatar){
            //         return avatar
            //     } else{
            //        
            //         if(response){
            //             
            //         }
            //         return ""
            //     }
                
            // }
                const new_data_user = {
                    name: name.value,
                    position: postision.value,
                    desc: desc.value,
                    cv: cv.value,
                    age: age.value,
                    image: await url()
                }
                console.log(new_data_user)
                const data = await fetch("http://localhost:3001/user/1", {
                    method:"PATCH",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(new_data_user)
                })

        })
    }
}

export default edit_user