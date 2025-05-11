// Función para convertir números a letras
function numeroALetras(numero) {
    const unidades = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const decenas = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const especiales = {
        11: 'once', 12: 'doce', 13: 'trece', 14: 'catorce', 15: 'quince',
        16: 'dieciséis', 17: 'diecisiete', 18: 'dieciocho', 19: 'diecinueve'
    };
    const centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    function procesarGrupo(n) {
        let resultado = '';
        
        // Centenas
        if (n >= 100) {
            if (n === 100) {
                return 'cien';
            }
            resultado += centenas[Math.floor(n / 100)] + ' ';
            n = n % 100;
        }
        
        // Decenas y unidades
        if (n > 0) {
            if (n <= 19 && especiales[n]) {
                resultado += especiales[n];
            } else {
                const decena = Math.floor(n / 10);
                const unidad = n % 10;
                if (decena > 0) {
                    resultado += decenas[decena];
                    if (unidad > 0) {
                        resultado += ' y ' + unidades[unidad];
                    }
                } else if (unidad > 0) {
                    resultado += unidades[unidad];
                }
            }
        }
        
        return resultado.trim();
    }

    if (numero === 0) return 'cero pesos';

    let parteEntera = Math.floor(numero);
    let decimales = Math.round((numero - parteEntera) * 100);
    let resultado = '';

    // Procesar millones
    if (parteEntera >= 1000000) {
        const millones = Math.floor(parteEntera / 1000000);
        if (millones === 1) {
            resultado += 'un millón ';
        } else {
            resultado += procesarGrupo(millones) + ' millones ';
        }
        parteEntera = parteEntera % 1000000;
    }

    // Procesar miles
    if (parteEntera >= 1000) {
        const miles = Math.floor(parteEntera / 1000);
        if (miles === 1) {
            resultado += 'mil ';
        } else {
            resultado += procesarGrupo(miles) + ' mil ';
        }
        parteEntera = parteEntera % 1000;
    }

    // Procesar centenas, decenas y unidades
    if (parteEntera > 0) {
        resultado += procesarGrupo(parteEntera);
    }

    // Agregar "pesos" y centavos
    resultado = resultado.trim() + ' peso' + (resultado.startsWith('un') ? '' : 's');
    
    if (decimales > 0) {
        if (decimales === 50) {
            resultado += ' con cincuenta centavos';
        } else {
            resultado += ' con ' + procesarGrupo(decimales) + ' centavo' + (decimales === 1 ? '' : 's');
        }
    }

    return resultado.trim();
}

// Función para calcular el total
function calcularTotal() {
    let total = 0;
    document.querySelectorAll('.moneda').forEach(input => {
        const cantidad = parseInt(input.value) || 0;
        const valor = parseFloat(input.dataset.valor);
        total += cantidad * valor;
    });
    return total;
}

// Función para actualizar la interfaz
function actualizarInterfaz(total) {
    document.getElementById('totalNumerico').textContent = `$${total.toFixed(2)}`;
    document.getElementById('totalLetras').textContent = numeroALetras(total);
}

// Función para guardar en el historial
function guardarEnHistorial(total) {
    const fecha = new Date().toLocaleString();
    const registro = {
        fecha: fecha,
        total: total,
        totalEnLetras: numeroALetras(total)
    };

    let historial = JSON.parse(localStorage.getItem('historialContador') || '[]');
    historial.unshift(registro);
    localStorage.setItem('historialContador', JSON.stringify(historial));
    
    actualizarHistorial();
}

// Función para actualizar el historial en la interfaz
function actualizarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historialContador') || '[]');
    const contenedorHistorial = document.getElementById('historial');
    contenedorHistorial.innerHTML = '';

    historial.forEach((registro, index) => {
        const elemento = document.createElement('div');
        elemento.className = 'bg-white p-4 rounded-lg shadow';
        elemento.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <p class="text-sm text-gray-500">${registro.fecha}</p>
                    <p class="text-lg font-semibold text-gray-900">$${registro.total.toFixed(2)}</p>
                    <p class="text-sm text-gray-700">${registro.totalEnLetras}</p>
                </div>
                <button onclick="eliminarRegistro(${index})" class="text-red-600 hover:text-red-800">
                    Eliminar
                </button>
            </div>
        `;
        contenedorHistorial.appendChild(elemento);
    });
}

// Función para eliminar un registro del historial
function eliminarRegistro(index) {
    let historial = JSON.parse(localStorage.getItem('historialContador') || '[]');
    historial.splice(index, 1);
    localStorage.setItem('historialContador', JSON.stringify(historial));
    actualizarHistorial();
}

// Función para limpiar todos los campos
function limpiarCampos() {
    document.querySelectorAll('.moneda').forEach(input => {
        input.value = '';
    });
    document.getElementById('totalNumerico').textContent = '$0.00';
    document.getElementById('totalLetras').textContent = 'Cero pesos';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Cargar historial al iniciar
    actualizarHistorial();

    // Botón Guardar
    document.getElementById('guardar').addEventListener('click', () => {
        const total = calcularTotal();
        guardarEnHistorial(total);
    });

    // Botón Limpiar
    document.getElementById('limpiar').addEventListener('click', limpiarCampos);

    // Auto-calcular cuando se modifica cualquier input
    document.querySelectorAll('.moneda').forEach(input => {
        input.addEventListener('input', () => {
            const total = calcularTotal();
            actualizarInterfaz(total);
        });
    });
});
