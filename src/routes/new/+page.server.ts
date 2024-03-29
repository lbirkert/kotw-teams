import { JWT_SECRET, REGISTRATION_TOKEN } from '$env/static/private';

import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

import jwt from 'jsonwebtoken';

import { secret } from '$lib/server/secret';
import { prisma } from '$lib/server/prisma';
import { form } from '$lib/server/form';
import { generateAvatar } from '$lib/server/avatar';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const { token, name } = await form({ token: 'text', name: 'text' } as const, request);

		if (token !== REGISTRATION_TOKEN) {
			return fail(401, {
				error: 'Invalid token'
			});
		}

		// Generate default avatar
		const avatar = await generateAvatar();

		const project = await prisma.project.create({
			data: { name, id: secret(5) }
		});

		const { login } = await prisma.member.create({
			data: {
				id: secret(5),
				projectId: project.id,
				login: secret(),
				role: 0,
				name: 'Anonymous',
				avatar
			}
		});

		const _token = jwt.sign({ login }, JWT_SECRET, {
			expiresIn: '1d'
		});

		cookies.set('Authorization', `Bearer ${_token}`, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 1 day
		});

		return {
			login
		};
	}
};
