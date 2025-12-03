import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const usersPath = path.join(process.cwd(), 'src', 'data', 'users.json')

// GET - Obter configurações
export async function GET() {
  try {
    const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))
    return NextResponse.json({ settings: usersData.settings })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao carregar configurações' },
      { status: 500 }
    )
  }
}

// POST - Atualizar configurações
export async function POST(request: NextRequest) {
  try {
    const newSettings = await request.json()

    const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))

    // Atualizar configurações
    usersData.settings = {
      ...usersData.settings,
      ...newSettings
    }

    // Salvar no arquivo
    fs.writeFileSync(usersPath, JSON.stringify(usersData, null, 2))

    return NextResponse.json({
      success: true,
      settings: usersData.settings
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar configurações' },
      { status: 500 }
    )
  }
}
