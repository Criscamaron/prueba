import {save, update, eliminar, obtener, getData } from './firebase.js'
let id = 0
document.getElementById('btn-guardar').addEventListener('click', async () => {
    document.querySelectorAll('.form-control .form-select').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        if (document.getElementById('btn-guardar').value == 'guardar') {
            const campeones = {
                'nom_camp': document.getElementById('nom_camp').value.trim(),
                'rol': document.getElementById('rol').value,
                'gene': document.querySelector('input[name="gene"]:checked').value,
                'region': document.getElementById('region').value,
                'año': document.getElementById('año').value,
                'raza': document.getElementById('raza').value,
                'tipo_gama': document.querySelector('input[name="tipo_gama"]:checked').value,
            }
            const agregado = await save(campeones);
            if(!agregado){
                Swal.fire({
                    title: "Error",
                    text: "Ese campeon ya existe",
                    icon: "error"
                })
            } 
            limpiar()    
        }else{
            const campeones = {
                'nom_camp': document.getElementById('nom_camp').value.trim(),
                'rol': document.getElementById('rol').value,
                'gene': document.querySelector('input[name="gene"]:checked').value,
                'region': document.getElementById('region').value,
                'año': document.getElementById('año').value,
                'raza': document.getElementById('raza').value,
                'tipo_gama': document.querySelector('input[name="tipo_gama"]:checked').value,
            }
            update(id,campeones)
            limpiar()
            id = 0
        }
    }
})
window.addEventListener('DOMContentLoaded', () => {
    getData((collection) => {
        let tabla = ''
        collection.forEach((doc) => {
            const item = doc.data()
            tabla += `<tr>
            <td>${item.nom_camp}</td>
            <td>${item.rol}</td>
            <td>${item.gene}</td>
            <td>${item.region}</td>
            <td>${item.año}</td>
            <td>${item.raza}</td>
            <td>${item.tipo_gama}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Seguro de eliminar el registro?",
                    text: "No podra revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminar(btn.id)
                        Swal.fire({
                            title: "Eliminado",
                            text: "Se ha eliminado el registro",
                            icon: "success"
                        })
                    }
                })
            })
        })
        document.querySelectorAll('.btn-warning').forEach( btn => {
            btn.addEventListener('click',async() =>{
                const doc = await obtener(btn.id)
                const d = doc.data()
                document.getElementById('nom_camp').value = d.nom_camp
                document.getElementById('rol').value = d.rol
                const gene = document.querySelector(`input[name="gene"][value="${d.gene}"]`);
                gene.checked = true;
                document.getElementById('region').value = d.region
                document.getElementById('año').value = d.año
                document.getElementById('raza').value = d.raza
                const tipo_gama = document.querySelector(`input[name="tipo_gama"][value="${d.tipo_gama}"]`);
                tipo_gama.checked = true;
                document.getElementById('btn-guardar').value = 'Modificar'
                id = btn.id
            })
        })

    })
})