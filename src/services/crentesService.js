const KEYS = {
  crentes: "crentes",
  crenteId: "crenteId",
};

export const getChurchCollection = () => [
  { id: "1", title: "NENHUMA" },
  { id: "2", title: "IURD" },
  { id: "3", title: "ASSEMBlEIA" },
  { id: "4", title: "ZIONE" },
  { id: "5", title: "CATOLICA" },
  { id: "6", title: "OUTRA" },
];
export const getNeighborhoodCollection = () => [
  { id: "1", title: "T3" },
  { id: "2", title: "Ndlavela" },
  { id: "3", title: "Mafalala" },
  { id: "4", title: "Zimpeto" },
];

// export function insertCrente(data) {
//   let crentes = getAllCrentes();
//   data["id"] = generateCrenteId();
//   crentes.push(data);
//   localStorage.setItem(KEYS.crentes, JSON.stringify(crentes));
// }

// export function updateCrente(data) {
//   let crentes = getAllCrentes();
//   let recordIndex = crentes.findIndex((x) => x.id == data.id);
//   crentes[recordIndex] = { ...data };
//   localStorage.setItem(KEYS.crentes, JSON.stringify(crentes));
// }
// export function deleteCrente(id) {
//   let crentes = getAllCrentes();
//   crentes = crentes.filter((x) => x.id != id);
//   localStorage.setItem(KEYS.crentes, JSON.stringify(crentes));
// }
// export function generateCrenteId() {
//   if (localStorage.getItem(KEYS.crenteId) == null)
//     localStorage.setItem(KEYS.crenteId, "0");
//   var id = parseInt(localStorage.getItem(KEYS.crenteId));
//   localStorage.setItem(KEYS.crenteId, (++id).toString());
//   return id;
// }

// // export function getAllCrentes() {
// //   if (localStorage.getItem(KEYS.crentes) == null)
// //     localStorage.setItem(KEYS.crentes, JSON.stringify([]));
// //   let crentes = JSON.parse(localStorage.getItem(KEYS.crentes));
// //   //map departmentID to department title
// //   let departments = getDepartmentCollection();
// //   return crentes.map((x) => ({
// //     ...x,
// //     department: departments[x.departmentId - 1].title,
// //   }));
// // }
