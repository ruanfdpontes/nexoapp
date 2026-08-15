import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET() {
  try {
    const result = await db.query(`
      SELECT
        v.id,
        v.leadership_id,
        v.title,
        v.description,
        v.visit_date,
        v.visited,
        v.address_street,
        v.address_number,
        v.address_neighborhood,
        v.address_city,
        v.address_state,
        v.address_zip_code,
        v.created_at,
        v.updated_at,

        l.name AS leadership_name,
        l.region AS leadership_region,
        l.address_neighborhood AS leadership_neighborhood
      FROM visits v
      INNER JOIN leaderships l
        ON l.id = v.leadership_id
      WHERE l.deleted_at IS NULL
      ORDER BY v.visit_date DESC, v.title ASC
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar visitas:", error);

    return NextResponse.json(
      { error: "Erro ao buscar visitas." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      leadership_id,
      title,
      description,
      visit_date,
      visited = false,
      address_street,
      address_number,
      address_neighborhood,
      address_city,
      address_state,
      address_zip_code,
    } = body;

    if (!leadership_id) {
      return NextResponse.json(
        { error: "Liderança é obrigatória." },
        { status: 400 }
      );
    }

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Título é obrigatório." },
        { status: 400 }
      );
    }

    if (!visit_date) {
      return NextResponse.json(
        { error: "Data e hora da visita são obrigatórias." },
        { status: 400 }
      );
    }

    const leadershipId = Number(leadership_id);

    if (!Number.isInteger(leadershipId) || leadershipId <= 0) {
      return NextResponse.json(
        { error: "Liderança inválida." },
        { status: 400 }
      );
    }

    const result = await db.query(
      `
        INSERT INTO visits (
          leadership_id,
          title,
          description,
          visit_date,
          visited,
          address_street,
          address_number,
          address_neighborhood,
          address_city,
          address_state,
          address_zip_code
        )
        VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10, $11
        )
        RETURNING id
      `,
      [
        leadershipId,
        title.trim(),
        description || null,
        visit_date,
        Boolean(visited),
        address_street || null,
        address_number || null,
        address_neighborhood || null,
        address_city || null,
        address_state || null,
        address_zip_code || null,
      ]
    );

    const visitId = result.rows[0].id;

    const visitResult = await db.query(
      `
        SELECT
          v.id,
          v.leadership_id,
          l.name AS leadership_name,
          v.title,
          v.description,
          v.visit_date,
          v.visited,
          v.address_street,
          v.address_number,
          v.address_neighborhood,
          v.address_city,
          v.address_state,
          v.address_zip_code,
          v.created_at,
          v.updated_at
        FROM visits v
        INNER JOIN leaderships l
          ON l.id = v.leadership_id
        WHERE v.id = $1
      `,
      [visitId]
    );

    return NextResponse.json(visitResult.rows[0], {
      status: 201,
    });
  } catch (error) {
    console.error("Erro ao criar visita:", error);

    return NextResponse.json(
      { error: "Erro ao criar visita." },
      { status: 500 }
    );
  }
}