import React from 'react';
import {UpdateAuth} from "./components/user/auth";
import {Route, Routes} from "react-router-dom";
import LessonPage from "./pages/lessonPage/LessonPage";
import FimboPage from "./pages/fimboPage/FimboPage";
import LessonTypePage from "./pages/lessonTypePage/LessonTypePage";
import VariablePage from "./pages/variablePage/VariablePage";
import PrivateRouter from "./components/PrivateRouter";
import AuthRouter from "./components/AuthRouter";
import Layout from "./components/Layout/Layout";
import LessonItemPage from "./pages/lessonPage/LessonItemPage";
import FimboItemPage from "./pages/fimboPage/FimboItemPage";
import LessonTypeItemPage from "./pages/lessonTypePage/LessonTypeItemPage";
import VariableItemPage from "./pages/variablePage/VariableItemPage";
import "./App.scss"
import LessonAddPage from "./pages/lessonPage/LessonAddPage";
import FimboAddPage from "./pages/fimboPage/FimboAddPage";
import LessonTypeAddPage from "./pages/lessonTypePage/LessonTypeAddPage";
import VariableAddPage from "./pages/variablePage/VariableAddPage";
import {HostInit} from "./components/initVars/HostInit";
import GenrePage from "./pages/genrePage/GenrePage";
import GenreItemPage from "./pages/genrePage/GenreItemPage";
import GenreAddPage from "./pages/genrePage/GenreAddPage";
import AudioPage from "./pages/audioPage/AudioPage";
import AudioItemPage from "./pages/audioPage/AudioItemPage";
import AudioAddPage from "./pages/audioPage/AudioAddPage";
function App() {

    UpdateAuth().then()
    HostInit().then()

    return (
        <Routes>
            <Route path="/" index element={<AuthRouter/>}/>
            <Route element={<PrivateRouter/>}>
                <Route element={<Layout/>}>
                    <Route path="/lesson" element={<LessonPage/>}/>
                    <Route path="/fimbo" element={<FimboPage/>}/>
                    <Route path="/audio" element={<AudioPage/>}/>
                    <Route path="/lesson-type" element={<LessonTypePage/>}/>
                    <Route path="/variable" element={<VariablePage/>}/>
                    <Route path="/genre" element={<GenrePage/>}/>

                    <Route path="/lesson/:id" element={<LessonItemPage/>}/>
                    <Route path="/fimbo/:id" element={<FimboItemPage/>}/>
                    <Route path="/audio/:id" element={<AudioItemPage/>}/>
                    <Route path="/lesson-type/:id" element={<LessonTypeItemPage/>}/>
                    <Route path="/variable/:id" element={<VariableItemPage/>}/>
                    <Route path="/genre/:id" element={<GenreItemPage/>}/>

                    <Route path="/lesson/add" element={<LessonAddPage/>}/>
                    <Route path="/fimbo/add" element={<FimboAddPage/>}/>
                    <Route path="/audio/add" element={<AudioAddPage/>}/>
                    <Route path="/lesson-type/add" element={<LessonTypeAddPage/>}/>
                    <Route path="/variable/add" element={<VariableAddPage/>}/>
                    <Route path="/genre/add" element={<GenreAddPage/>}/>
                </Route>
            </Route>

        </Routes>
    );
}

export default App;
