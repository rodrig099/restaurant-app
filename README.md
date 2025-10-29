# 🍔 Delicias Express - App de Restaurante

Aplicación móvil para pedidos de comida a domicilio desarrollada con React Native y Expo.

## 📱 Características

- ✅ Sistema de autenticación (Login, Registro, Modo Invitado)
- ✅ Catálogo de productos con categorías
- ✅ Búsqueda avanzada con filtros
- ✅ Carrito de compras funcional
- ✅ Gestión de múltiples direcciones de entrega
- ✅ Checkout y confirmación de pedidos
- ✅ Seguimiento de pedidos en tiempo real
- ✅ Historial de pedidos
- ✅ Repetir pedidos anteriores
- ✅ Perfil de usuario personalizable
- ✅ Configuración de notificaciones
- ✅ Pago contra entrega

## 🚀 Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- npm o yarn
- Expo CLI
- Android Studio (para emulador Android) o Xcode (para iOS)

### Pasos de instalación

1. Clonar el repositorio
```bash
git clone https://github.com/rodrig099/restaurant-app.git
cd restaurant-app
```

2. Instalar dependencias
```bash
npm install
```

3. Iniciar el proyecto
```bash
npx expo start
```

4. Ejecutar en dispositivo
- Presiona `a` para Android
- Presiona `i` para iOS
- Escanea el QR con Expo Go en tu dispositivo físico

## 📦 Dependencias Principales

- **Expo** - Framework para React Native
- **Expo Router** - Navegación basada en archivos
- **React Native** - Framework para desarrollo móvil
- **React Navigation** - Navegación con tabs
- **@expo/vector-icons** - Iconos

## 🏗️ Estructura del Proyecto
```
restaurant-app/
├── app/                          # Pantallas (Expo Router)
│   ├── auth/                     # Autenticación
│   │   ├── welcome.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── main/                     # Navegación principal
│   │   ├── _layout.tsx           # Tab Navigator
│   │   ├── home.tsx
│   │   ├── cart.tsx
│   │   ├── orders.tsx
│   │   └── profile.tsx
│   ├── product-detail.tsx
│   ├── search.tsx
│   ├── checkout.tsx
│   ├── order-confirmation.tsx
│   ├── order-detail.tsx
│   ├── addresses.tsx
│   ├── add-address.tsx
│   ├── edit-profile.tsx
│   ├── settings.tsx
│   ├── about.tsx
│   ├── index.tsx
│   └── _layout.tsx
├── src/
│   ├── components/               # Componentes reutilizables
│   │   ├── CategoryCard.js
│   │   ├── ProductCard.js
│   │   ├── Toast.js
│   │   └── Loading.js
│   ├── context/                  # Gestión de estado
│   │   ├── AuthContext.js
│   │   ├── CartContext.js
│   │   ├── AddressContext.js
│   │   ├── OrderContext.js
│   │   └── SearchContext.js
│   └── utils/                    # Utilidades
│       ├── colors.js
│       ├── mockData.js
│       └── validators.js
├── assets/                       # Recursos estáticos
├── package.json
└── README.md
```

## 🎨 Paleta de Colores
```javascript
{
  primary: '#FF2D55',      // Rojo principal
  secondary: '#FF6B6B',    // Rojo secundario
  background: '#FFFFFF',   // Fondo blanco
  card: '#F8F9FA',        // Gris muy claro
  text: '#2D3436',        // Texto oscuro
  textLight: '#636E72',   // Texto secundario
  success: '#00B894',     // Verde
  warning: '#FDCB6E',     // Amarillo
  border: '#DFE6E9',      // Bordes
}
```

## 🔄 Flujo de Usuario

1. **Bienvenida** → Usuario puede iniciar sesión, registrarse o continuar como invitado
2. **Home** → Explora categorías y productos
3. **Búsqueda** → Busca y filtra productos
4. **Producto** → Ve detalles y agrega al carrito
5. **Carrito** → Revisa productos y cantidades
6. **Checkout** → Selecciona dirección y confirma pedido
7. **Confirmación** → Recibe número de pedido
8. **Seguimiento** → Monitorea el estado del pedido

## 📸 Screenshots

_Proximamente_

## 🛠️ Desarrollo

### Agregar nueva pantalla
```bash
touch app/nueva-pantalla.tsx
```

### Agregar nuevo componente
```bash
touch src/components/NuevoComponente.js
```

### Agregar nuevo context
```bash
touch src/context/NuevoContext.js
```

## 🚧 Próximas Funcionalidades

- [ ] Integración con API real
- [ ] Persistencia con AsyncStorage
- [ ] Imágenes reales de productos
- [ ] Sistema de favoritos
- [ ] Calificaciones y reseñas
- [ ] Chat con soporte
- [ ] Cupones de descuento
- [ ] Programa de puntos
- [ ] Compartir en redes sociales

## 📝 Notas Importantes

- **Pago**: Actualmente la app está configurada para pago contra entrega (efectivo al domiciliario)
- **Datos**: Los productos y pedidos son datos mock (de prueba)
- **Autenticación**: No hay validación real, es simulada para propósitos de desarrollo

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👤 Autor

**rodrigo099**
- GitHub: [@rodrig099](https://github.com/rodrig099)

## 🙏 Agradecimientos

- Expo Team por el excelente framework
- React Native Community
- Todos los contribuidores

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!