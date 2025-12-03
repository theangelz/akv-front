import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const usersPath = path.join(process.cwd(), 'src', 'data', 'users.json')

// GET - Listar usuários
export async function GET() {
  try {
    const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))

    // Retornar usuários sem senhas
    const usersWithoutPasswords = usersData.users.map(({ password, ...user }: any) => user)

    return NextResponse.json({ users: usersWithoutPasswords })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao carregar usuários' },
      { status: 500 }
    )
  }
}

// POST - Criar usuário
export async function POST(request: NextRequest) {
  try {
    const newUser = await request.json()

    const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))

    // Verificar se usuário já existe
    const userExists = usersData.users.some((u: any) => u.username === newUser.username)

    if (userExists) {
      return NextResponse.json(
        { error: 'Usuário já existe' },
        { status: 400 }
      )
    }

    // Adicionar novo usuário
    const user = {
      id: Date.now().toString(),
      username: newUser.username,
      password: newUser.password,
      name: newUser.name,
      email: newUser.email,
      createdAt: new Date().toISOString()
    }

    usersData.users.push(user)

    // Salvar no arquivo
    fs.writeFileSync(usersPath, JSON.stringify(usersData, null, 2))

    // Retornar usuário sem senha
    const { password, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar usuário
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')

    if (!userId) {
      return NextResponse.json(
        { error: 'ID do usuário não fornecido' },
        { status: 400 }
      )
    }

    const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))

    // Não permitir deletar o último usuário
    if (usersData.users.length === 1) {
      return NextResponse.json(
        { error: 'Não é possível deletar o último usuário' },
        { status: 400 }
      )
    }

    // Filtrar usuário
    usersData.users = usersData.users.filter((u: any) => u.id !== userId)

    // Salvar no arquivo
    fs.writeFileSync(usersPath, JSON.stringify(usersData, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar usuário' },
      { status: 500 }
    )
  }
}
