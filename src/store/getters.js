const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  uid: state => state.user.uid,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  // 学生基本信息
  name: state => state.student.name,
  phone: state => state.student.phone,
  email: state => state.student.email,
  qq: state => state.student.qq,
  simage: state => state.student.simage,
  // 学生考研成绩
  math: state => state.student.math,
  english: state => state.student.english,
  politics: state => state.student.politics,
  specialized: state => state.student.specialized,
  total: state => state.student.total,
  type: state => state.student.type,
  // 学生教育经历
  estartime: state => state.student.estartime,
  eendtime: state => state.student.eendtime,
  school: state => state.student.school,
  major: state => state.student.major, // 所学专业
  edec: state => state.student.edec,
  // 学生项目经历
  project: state => state.student.project,
  position: state => state.student.position,
  pstarttime: state => state.student.pstarttime,
  pendtime: state => state.student.pendtime,
  pdec: state => state.student.pdec,
  // 老师基本信息
  tname: state => state.teacher.name,
  title: state => state.teacher.title,
  temail: state => state.teacher.email,
  research_direction: state => state.teacher.research_direction,
  image: state => state.teacher.image,
  research_findings: state => state.teacher.research_findings,
  // 老师项目经历
  tschool:state => state.teacher.school,
  tposition: state => state.teacher.position,
  tstarttime: state => state.teacher.time_start,
  tendtime: state => state.teacher.time_end,
  describes: state => state.teacher.describes,
  // 查询导师列表
  teacherList: state => state.teacher.teacherList,
  myVoluntary:　state => state.voluntary.myVoluntary
}
export default getters
