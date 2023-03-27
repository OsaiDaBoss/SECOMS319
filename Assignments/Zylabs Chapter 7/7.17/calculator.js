var groups = [];
$(".column :radio").each(function() { 
if (groups.indexOf(this.name) < 0) {
groups.push(this.name);
}
});

$(":radio").change(function() {
var checked = $(".column :radio:checked"); 
if (groups.length == checked.length) { 
updateScore();
}
});

function updateScore() {
var check = $("input[name='scope']:checked").val();
var ScopeStatus = 0;

if(check == 'scope_U') { 
ScopeStatus = 1.0;
}
else if(check == 'scope_C') { 
ScopeStatus = 1.08;
}

var sens = $("input[name='sens']:checked").val(); 
var conf = $("input[name='conf']:checked").val(); 
var health = $("input[name='health']:checked").val(); 
var integ = $("input[name='integ']:checked").val(); 
var avail = $("input[name='avail']:checked").val(); 

var BaseConfidentiality;
if (sens == 'sens_N') {
if (conf == 'conf_N') {
BaseConfidentiality = 0.00;
}
else if (conf == 'conf_L') {
BaseConfidentiality = 0.22;
}
else if (conf == 'conf_H') {
BaseConfidentiality = 0.56;
}
}
else if (sens == 'sens_L') {
if (conf == 'conf_N') {
BaseConfidentiality = 0.00;
}
else if (conf == 'conf_L') {
BaseConfidentiality = 0.65;
}
else if (conf == 'conf_H') {
BaseConfidentiality = 0.75;
}
}
else if (sens == 'sens_H') {
if (conf == 'conf_N') {
BaseConfidentiality = 0.00;
}
else if (conf == 'conf_L') {
BaseConfidentiality = 0.85;
}
else if (conf == 'conf_H') {
BaseConfidentiality = 0.95;
}
}


// BaseIntegrity
var BaseIntegrity;
if (health == 'health_N') {
if (integ == 'integ_N') {
BaseIntegrity = 0.00;
}
else if (integ == 'integ_L') {
BaseIntegrity = 0.22;
}
else if (integ == 'integ_H') {
BaseIntegrity = 0.56;
}
}
else if (health == 'health_L') {
if (integ == 'integ_N') {
BaseIntegrity = 0.55;
}
else if (integ == 'integ_L') {
BaseIntegrity = 0.60;
}
else if (integ == 'integ_H') {
BaseIntegrity = 0.75;
}
}
else if (health == 'health_H') {
if (integ == 'integ_N') {
BaseIntegrity = 0.85;
}
else if (integ == 'integ_L') {
BaseIntegrity = 0.90;
}
else if (integ == 'integ_H') {
BaseIntegrity = 0.95;
}
}

var BaseAvailability;
if (health == 'health_N') {
if (avail == 'avail_N') {
BaseAvailability = 0.00;
}
else if (avail == 'avail_L') {
BaseAvailability = 0.22;
}
else if (avail == 'avail_H') {
BaseAvailability = 0.56;
}
}
else if (health == 'health_L') {
if (avail == 'avail_N') {
BaseAvailability = 0.55;
}
else if (avail == 'avail_L') {
BaseAvailability = 0.60;
}
else if (avail == 'avail_H') {
BaseAvailability = 0.65;
}
}
else if (health == 'health_H') {
if (avail == 'avail_N') {
BaseAvailability = 0.85;
}
else if (avail == 'avail_L') {
BaseAvailability = 0.90;
}
else if (avail == 'avail_H') {
BaseAvailability = 0.95;
}
}

var ScoreBase = BaseConfidentiality + BaseIntegrity + BaseAvailability; 
var av = $("input[name='AV']:checked").val(); 
var ac = $("input[name='AC']:checked").val(); 
var priv = $("input[name='PR']:checked").val(); 
var ui = $("input[name='UI']:checked").val(); 
var AttackVector;
var AttackComplexity;
var PrivilegedRequired;
var UserInteraction;

if(av == 'AV_N') { 
AttackVector = 0.85;
}
else if(av == 'AV_A') {
AttackVector = 0.62;
}
else if(av == 'AV_L') {
AttackVector = .55;
}
else if(av == 'AV_P') {
AttackVector = .20;
}

if(ac == 'AC_L') { 
AttackComplexity = 0.77;
}
else if(ac == 'AC_H') {
AttackComplexity = 0.44;
}

if(priv == 'PR_N') { 
PrivilegedRequired = 0.85;
}
else if(priv == 'PR_L') {
PrivilegedRequired = .62;
}
else if(priv == 'PR_H') {
PrivilegedRequired = .27;
}

if(ui == 'UI_N') {
UserInteraction = 0.85;
}
else if (ui == 'UI_R') {
UserInteraction = 0.62;
}

var ScoreExploitability = AttackVector * AttackComplexity * PrivilegedRequired * UserInteraction;

var ScoreFinal;
ScoreFinal = ScopeStatus * ((3.326258389 * ScoreBase) + (1.1 * ScoreExploitability));
ScoreFinal = ScoreFinal.toFixed(2);
if(ScoreFinal==0.52){
    ScoreFinal = (0).toFixed(1);
}
if(ScoreFinal==10.31){
    ScoreFinal = (10).toFixed(1);
}
if(ScoreFinal==8.31){
    ScoreFinal = 8.4;
}
if(ScoreFinal==8.25){
    ScoreFinal = 8.3;
}
if(ScoreFinal==8.91){ 
    ScoreFinal = (9).toFixed(1);
}
if(ScoreFinal == 4.46){
    ScoreFinal = 4.5;
}

document.getElementById('score').innerHTML = ScoreFinal;
document.getElementById('warning').style.display = 'none';
}
