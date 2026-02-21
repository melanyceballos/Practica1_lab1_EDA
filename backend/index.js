
const http = require('http');
const url = require('url');


const server = http.createServer((req, res) => {
    
    res.setHeader('Content-Type', 'text/html');
    
   
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    
  
    if (path === '/') {
       
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Calculadora de Cuota</title>
                <style>
                    body { text-align: center; font-family: Arial; margin-top: 50px; }
                    input { margin: 10px; padding: 5px; }
                    button { padding: 10px 20px; background-color: green; color: white; }
                </style>
            </head>
            <body>
                <h1>Calculadora de Cuota Mensual</h1>
                <form action="/calcular" method="GET">
                    <input type="text" name="nombre" placeholder="Nombre" required><br>
                    <input type="number" name="prestamo" placeholder="Préstamo ($)" required><br>
                    <input type="number" name="meses" placeholder="Meses" required><br>
                    <input type="number" name="interes" step="0.01" placeholder="Interés (%)" required><br>
                    <button type="submit">Calcular</button>
                </form>
            </body>
            </html>
        `);
    }
    
    else if (path === '/calcular') {
        
        const query = parsedUrl.query;
        const nombre = query.nombre;
        const prestamo = parseFloat(query.prestamo);
        const meses = parseInt(query.meses);
        const interesPorcentaje = parseFloat(query.interes);
        
        
        res.end(`<h2>Resultado:</h2>
        <textarea rows="4" cols="50" readonly>${nombre} – $${cuota.toFixed(2)} -- $${prestamo} -- ${meses} meses -- ${interesPorcentaje}%</textarea>
        <br>
        <a href="/">Nuevo cálculo</a>`);
        
        
        const interes = interesPorcentaje / 100;
        
        
        try {
            const factor = Math.pow(1 + interes, meses);
            const cuota = prestamo * ((factor * interes) / (factor - 1));
            
            
            res.end(`
                <h2>Resultado:</h2>
                <p style="font-size: 20px;">
                    <strong>${nombre}</strong> – 
                    <strong>$${cuota.toFixed(2)}</strong> -- 
                    $${prestamo} -- 
                    ${meses} meses -- 
                    ${interesPorcentaje}%
                </p>
                <br>
                <a href="/">Nuevo cálculo</a>
            `);
        } catch (error) {
            res.end(`<h2>Error en cálculo: ${error.message}</h2><a href="/">Volver</a>`);
        }
    }
    
    else {
        res.end('<h2>404 - Página no encontrada</h2><a href="/">Volver</a>');
    }
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
});