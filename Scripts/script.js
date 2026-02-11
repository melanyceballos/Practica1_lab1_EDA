// Array para almacenar los préstamos
let prestamos = [];

// Función para calcular la cuota mensual
function calcularCuota() {
    const nombre = document.getElementById('nombre').value;
    const prestamo = parseFloat(document.getElementById('prestamo').value);
    const meses = parseInt(document.getElementById('meses').value);
    const interesPorcentaje = parseFloat(document.getElementById('interes').value);
    
    
    if (!nombre || isNaN(prestamo) || isNaN(meses) || isNaN(interesPorcentaje)) {
        alert('Por favor complete todos los campos correctamente');
        return;
    }
    
    
    const interes = interesPorcentaje / 100;
    
    
    const factor = Math.pow(1 + interes, meses);
    const cuota = prestamo * ((factor * interes) / (factor - 1));
    
    
    const cuotaRedondeada = Math.round(cuota * 100) / 100;
    
    
    const resultado = document.getElementById('resultado');
    resultado.value = `${nombre} debe pagar $${cuotaRedondeada.toLocaleString()} cada mes por el préstamo de $${prestamo.toLocaleString()} a ${meses} meses con el interés del ${interesPorcentaje}%`;
    
    
    const prestamoObj = {
        nombre: nombre,
        prestamo: prestamo,
        meses: meses,
        interes: interesPorcentaje,
        cuota: cuotaRedondeada
    };
    
    
    prestamos.push(prestamoObj);
    
    
}


function mostrarTodos() {
    const resultado = document.getElementById('resultado');
    
    if (prestamos.length === 0) {
        resultado.value = 'No hay préstamos almacenados.';
        return;
    }
    
    let texto = '=== TODOS LOS PRÉSTAMOS ===\n\n';
    prestamos.forEach((item, index) => {
        texto += `${index + 1}. ${item.nombre} - Préstamo: $${item.prestamo.toLocaleString()} - Meses: ${item.meses} - Interés: ${item.interes}% - Cuota: $${item.cuota.toLocaleString()}\n`;
    });
    
    resultado.value = texto;
}


function mostrarReporte(titulo, contenido) {
    const reporteDiv = document.getElementById('reporteResultado');
    reporteDiv.innerHTML = `<h3>${titulo}</h3><pre>${contenido}</pre>`;
}

function sumatoriaCuotas() {
    const suma = prestamos.reduce((total, item) => total + item.cuota, 0);
    mostrarReporte('Sumatoria de todas las cuotas', `Total: $${suma.toLocaleString()}\n\nDetalle por préstamo:\n` + 
        prestamos.map(item => `${item.nombre}: $${item.cuota.toLocaleString()}`).join('\n'));
}


function cuotasMayores300k() {
    const filtrados = prestamos.filter(item => item.cuota > 300000);
    mostrarReporte('Préstamos con cuota mayor a $300,000', 
        filtrados.length > 0 ? 
        filtrados.map(item => `${item.nombre} - Cuota: $${item.cuota.toLocaleString()} - Préstamo: $${item.prestamo.toLocaleString()}`).join('\n') :
        'No hay préstamos con cuota mayor a $300,000');
}

function menosUnAnio() {
    const filtrados = prestamos.filter(item => item.meses < 12);
    mostrarReporte('Préstamos a pagar en menos de un año', 
        filtrados.length > 0 ? 
        filtrados.map(item => `${item.nombre} - Meses: ${item.meses} - Cuota: $${item.cuota.toLocaleString()}`).join('\n') :
        'No hay préstamos a pagar en menos de un año');
}


function prestamoMayor5M() {
    const encontrado = prestamos.find(item => item.prestamo > 5000000);
    mostrarReporte('Primer préstamo mayor a $5,000,000', 
        encontrado ? 
        `${encontrado.nombre} - Préstamo: $${encontrado.prestamo.toLocaleString()} - Cuota: $${encontrado.cuota.toLocaleString()}` :
        'No se encontró ningún préstamo mayor a $5,000,000');
}


function interesMenor2() {
    const encontrado = prestamos.find(item => item.interes < 2);
    mostrarReporte('Primer préstamo con interés menor al 2%', 
        encontrado ? 
        `${encontrado.nombre} - Interés: ${encontrado.interes}% - Préstamo: $${encontrado.prestamo.toLocaleString()}` :
        'No se encontró ningún préstamo con interés menor al 2%');
}


function incrementarCuotas() {
    const incrementadas = prestamos.map(item => ({
        ...item,
        cuotaIncrementada: item.cuota + 90000
    }));
    
    mostrarReporte('Cuotas incrementadas en $90,000', 
        incrementadas.map(item => 
            `${item.nombre}: Cuota original: $${item.cuota.toLocaleString()} → Nueva cuota: $${item.cuotaIncrementada.toLocaleString()}`
        ).join('\n'));
}


function decrementarPrestamos() {
    const decrementados = prestamos.map(item => ({
        ...item,
        prestamoDecrementado: item.prestamo - 90000
    }));
    
    mostrarReporte('Préstamos decrementados en $90,000', 
        decrementados.map(item => 
            `${item.nombre}: Préstamo original: $${item.prestamo.toLocaleString()} → Nuevo préstamo: $${item.prestamoDecrementado.toLocaleString()}`
        ).join('\n'));
}


function soloCuotas() {
    const soloCuotas = prestamos.map(item => item.cuota);
    mostrarReporte('Cuotas', 
        JSON.stringify(soloCuotas, null, 2) + 
        '\n\nListado:\n' +
        soloCuotas.map((cuota, index) => `${index + 1}. $${cuota.toLocaleString()}`).join('\n'));
}