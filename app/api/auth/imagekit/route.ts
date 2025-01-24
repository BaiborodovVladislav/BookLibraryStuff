import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

if (!publicKey || !privateKey || !urlEndpoint) {
  throw new Error("ImageKit configuration is missing");
}

const imagekit = new ImageKit({
  privateKey: privateKey,
  publicKey: publicKey,
  urlEndpoint: urlEndpoint,
});

export async function GET() {
  // Получаем параметры аутентификации
  const authParams = imagekit.getAuthenticationParameters();

  // Возвращаем ответ с CORS-заголовками
  return NextResponse.json(authParams, {
    headers: {
      "Access-Control-Allow-Origin": "*", // Разрешить запросы с любого источника
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Разрешенные HTTP-методы
      "Access-Control-Allow-Headers": "Content-Type, Authorization", // Разрешенные заголовки
    },
  });
}
