const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
    }
    else {
        input.classList.add('is-valid')
        if (id == 'año') {
            const dia = validarFecha(input.value)
            if (!dia) {
                input.classList.add('is-invalid')
            }
        }
    }
}
const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
    })
    document.getElementById('btn-guardar').value = 'Guardar'
}

const validarFecha = (ano) => {
    const hoy = new Date();
    const fecha = new Date(ano);
    return fecha <= hoy;
};