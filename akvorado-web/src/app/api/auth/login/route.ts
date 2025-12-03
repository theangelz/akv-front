import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Ler usuários do arquivo
    const usersPath = path.join(process.cwd(), 'src', 'data', 'users.json')
    const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))

    // Verificar credenciais
    const user = usersData.users.find(
      (u: any) => u.username === username && u.password === password
    )

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Retornar usuário (sem senha)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao fazer login' },
      { status: 500 }
    )
  }
}
