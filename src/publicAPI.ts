import { Year } from './Types';
import fetch from 'node-fetch';

export const baseURL = 'https://api.multiviewer.app/api/v1';

/**
 * Get all the FIA Documents of a specific year
 * @param year - Year of the wanted documents
 */
export async function getFIA_Documents(year: Year): Promise<object> {
  const req = await fetch(`${baseURL}/fia-documents/${year}`);
  const data = await req.json();

  return data;
}

/**
 * Get all the infos of a specific circuit
 * @param cicuitId - Id of the wanted circuit
 * @param year - For a specific year
 */
export async function getCircuitInfo(
  cicuitId: number,
  year: Year
): Promise<object> {
  const req = await fetch(`${baseURL}/circuits/${cicuitId}/${year}`);
  const data = await req.json();

  return data;
}
