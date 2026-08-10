import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET() {
  try {
    const result = await db.query(`
      SELECT
        id,
        name,
        votes_projection,
        region,
        phone_number,
        mobile_number,
        address_cep,
        address_street,
        address_number,
        address_complement,
        address_neighborhood,
        address_city,
        address_state,
        voter_registration_number,
        voter_zone,
        voter_section,
        voter_city,
        voter_location,
        created_at,
        updated_at
      FROM leaderships
      WHERE deleted_at IS NULL
      ORDER BY name ASC
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar lideranças:", error);

    return NextResponse.json(
      { error: "Erro ao buscar lideranças." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      votes_projection = 0,
      region,
      phone_number,
      mobile_number,
      address_cep,
      address_street,
      address_number,
      address_complement,
      address_neighborhood,
      address_city,
      address_state,
      voter_registration_number,
      voter_zone,
      voter_section,
      voter_city,
      voter_location,
    } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Nome é obrigatório." },
        { status: 400 }
      );
    }

    const votesProjection = Number(votes_projection);

    if (
      !Number.isInteger(votesProjection) ||
      votesProjection < 0
    ) {
      return NextResponse.json(
        { error: "Projeção de votos inválida." },
        { status: 400 }
      );
    }

    const result = await db.query(
      `
        INSERT INTO leaderships (
          name,
          votes_projection,
          region,
          phone_number,
          mobile_number,
          address_cep,
          address_street,
          address_number,
          address_complement,
          address_neighborhood,
          address_city,
          address_state,
          voter_registration_number,
          voter_zone,
          voter_section,
          voter_city,
          voter_location
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8,
          $9, $10, $11, $12, $13, $14, $15, 
          $16, $17
        )
        RETURNING
          id,
          name,
          votes_projection,
          region,
          phone_number,
          mobile_number,
          address_cep,
          address_street,
          address_number,
          address_complement,
          address_neighborhood,
          address_city,
          address_state,
          voter_registration_number,
          voter_zone,
          voter_section,
          voter_city,
          voter_location,
          created_at,
          updated_at
      `,
      [
        name.trim(),
        votesProjection,
        region,
        phone_number || null,
        mobile_number || null,
        address_cep || null,
        address_street || null,
        address_number || null,
        address_complement || null,
        address_neighborhood || null,
        address_city || null,
        address_state || null,
        voter_registration_number || null,
        voter_zone || null,
        voter_section || null,
        voter_city || null,
        voter_location || null,
      ]
    );

    return NextResponse.json(result.rows[0], {
      status: 201,
    });
  } catch (error) {
    console.error("Erro ao criar liderança:", error);

    return NextResponse.json(
      { error: "Erro ao criar liderança." },
      { status: 500 }
    );
  }
}