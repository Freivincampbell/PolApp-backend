import { ROLE } from '../../constants';
import { ICurrentUser } from '../../interfaces/current-user.interface';

export const findAllQuery = ({ id, role, user }: ICurrentUser) => {
	let query;
	switch (role) {
		case ROLE.CLIENT:
			query = {
				user: id,
				role: {
					$in: [ROLE.AGENT, ROLE.COSTUMER],
				},
			};
			break;
		case ROLE.AGENT:
			query = {
				user: user,
				role: {
					$in: [ROLE.AGENT, ROLE.COSTUMER],
				},
			};
			break;
		case ROLE.SUPERADMIN:
			query = {
				role: {
					$in: [ROLE.SUPERADMIN, ROLE.CLIENT, ROLE.AGENT, ROLE.COSTUMER],
				},
			};
			break;
		default:
			query = {};
	}

	return query;
};

export const findOneQuery = (id: string, currentUser: ICurrentUser) => {
	let query;
	switch (currentUser.role) {
		case ROLE.CLIENT:
			query = {
				_id: id,
				user: currentUser.id,
				$or: [{ role: ROLE.AGENT }, { role: ROLE.COSTUMER }],
			};
			break;
		case ROLE.AGENT:
			query = {
				_id: {
					$or: [{ _id: currentUser.id }, { _id: id }],
				},
				user: currentUser.user,
				$or: [{ role: ROLE.AGENT }, { role: ROLE.COSTUMER }],
			};
			break;
		case ROLE.SUPERADMIN:
			query = {
				_id: id,
				$or: [
					{ role: ROLE.SUPERADMIN },
					{ role: ROLE.CLIENT },
					{ role: ROLE.AGENT },
					{ role: ROLE.COSTUMER },
				],
			};
			break;
		default:
			query = {};
	}

	return query;
};
