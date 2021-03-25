var correct = 0, wrong = 0, quizLock = localStorage.getItem("quizLock") || "";

async function quizCheck() {
    if (quizLock == "true") {
        document.getElementById("homepage").style.opacity = 0;
        await sleep(300);
        document.getElementById("homepage").style.display = "none";
        document.getElementById("correctBox").innerHTML = localStorage.getItem("correctN");
        document.getElementById("wrongBox").innerHTML = localStorage.getItem("wrongN");
        document.getElementById("leaderpage").style.display = "block";
        await sleep(300);
        document.getElementById("leaderpage").style.opacity = 1;
    }
}

async function quizStart() {
    localStorage.setItem("quizLock", "true");
    document.getElementById("homepage").style.opacity = 0;
    await sleep(300);
    document.getElementById("homepage").style.display = "none";
    document.getElementById("page1").style.display = "block";
    await sleep(300);
    document.getElementById("page1").style.opacity = 1;
}

async function verifyPage(right) {
    let page = right.slice(0, 1);
    if (document.getElementById(`btnPage${page}`).innerHTML == "Verify") {
        if (document.getElementById(right).getAttribute("checked") != null) {
            document.getElementById(right).style.backgroundColor = "rgb(52, 199, 89)";
            correct++;
        }
        else {
            document.getElementById(right).style.backgroundColor = "rgb(52, 199, 89)";
            for (let i = 1; i < 5; i++) {
                if (document.getElementById(`${page}-${i}`).getAttribute("checked") != null)
                    document.getElementById(`${page}-${i}`).style.backgroundColor = "rgb(255, 59, 48)";
            }
            wrong++;
        }
        if (page != "5")
            document.getElementById(`btnPage${page}`).innerHTML = "Next";
        else
            document.getElementById(`btnPage${page}`).innerHTML = "Finish";
    }
    else {
        document.getElementById(`page${page}`).style.opacity = 0;
        await sleep(300);
        document.getElementById(`page${page}`).style.display = "none";
        if (page != "5") {
            document.getElementById(`page${Number(page) + 1}`).style.display = "block";
            await sleep(300);
            document.getElementById(`page${Number(page) + 1}`).style.opacity = 1;
        }
        else {
            document.getElementById("correctBox").innerHTML = correct;
            document.getElementById("wrongBox").innerHTML = wrong;
            document.getElementById("leaderpage").style.display = "block";
            await sleep(300);
            document.getElementById("leaderpage").style.opacity = 1;
        }
    }
    localStorage.setItem("correctN", correct);
    localStorage.setItem("wrongN", wrong);
}

document.getElementById("resultsHeader").addEventListener("dblclick", async function (event) {
    if (event.ctrlKey) {
        localStorage.setItem("quizLock", "false");
        localStorage.setItem("correctN", "0");
        localStorage.setItem("wrongN", "0");
        alert("Quiz Repeat Unlocked!");
        document.getElementById("leaderpage").style.opacity = 0;
        await sleep(300);
        document.getElementById("leaderpage").style.display = "none";
        document.getElementById("homepage").style.display = "block";
        await sleep(300);
        document.getElementById("homepage").style.opacity = 1;
    }
});

function select(checkbox) {
    let page = checkbox.slice(0, 1);
    if (document.getElementById(`btnPage${page}`).innerHTML == "Verify") {
        for (let i = 1; i < 5; i++) {
            document.getElementById(`${page}-${i}`).removeAttribute("checked");
            document.getElementById(`${page}-${i}`).style.backgroundColor = "rgb(210, 210, 210)";
        }
        document.getElementById(checkbox).setAttribute("checked", "");
        document.getElementById(checkbox).style.backgroundColor = "rgb(0, 122, 255)";
        document.getElementById(`btnPage${page}`).disabled = false;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

quizCheck();