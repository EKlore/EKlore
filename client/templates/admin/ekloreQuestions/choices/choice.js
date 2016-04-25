Template.choice.helpers({
	universes() {
		if (!Template.parentData(1).universesLinked || Template.parentData(1).universesLinked.length === 0) {
			return false;
		} else if (!this.universesLinked || this.universesLinked.length === 0) {
			let qStart = { _id: { $in: [] } };
			Template.parentData(1).universesLinked.map((cur, index, array) => {
				return qStart._id['$in'].push(cur.universeId);
			});
			return Universes.find(qStart, {
				fields: {
					name: 1
				}
			});
		} else {
			let qStart = { $and: [] };
			let qIn = { _id: { $in: [] } };
			let qNin = { _id: { $nin: [] } };
			Template.parentData(1).universesLinked.map((cur, index, array) => {
				return qIn._id['$in'].push(cur.universeId);
			});
			this.universesLinked.map((cur, index, array) => {
				return qNin._id['$nin'].push(cur.universeId);
			});
			qStart['$and'].push(qIn, qNin);
			return Universes.find(qStart, {
				fields: {
					name: 1
				}
			});
		}
	}
});
