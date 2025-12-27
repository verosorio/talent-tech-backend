# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Generar Prisma Client
RUN npx prisma generate

# Construir la aplicación
RUN npm run build

# Verificar que dist se creó (debug)
RUN ls -la
RUN ls -la dist || echo "ERROR: dist folder not found!"

# Etapa de producción
FROM node:20-alpine AS production

WORKDIR /app

# Copiar archivos necesarios
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/dist ./dist

# Verificar que todo se copió (debug)
RUN ls -la
RUN ls -la dist

# Exponer puerto
EXPOSE 3000

# Comando para iniciar
CMD ["node", "dist/src/main.js"]