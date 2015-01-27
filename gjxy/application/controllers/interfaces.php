<?php
/**
*interfaces.php
*接口文件
* @category    controller
* @author      xqguo
*/
	class Interfaces extends CI_Controller{
	
		/**
			*构造函数
			*
			* @access  public
			* @return void
			*/
		public function __construct(){
			parent::__construct();
			$this->load->database();
			$this->load->model('data_model','data');
		}
		
		/**
			*栏目函数
			*
			* @access  public
			* @return string
			*/
		public function menu($id=null){
			$data['menu']=$this->data->get_Menu();  //导航菜单
			
			//二级菜单
			/*if(!empty($id)){
				$data['Bmenu']=$this->data->get_B_Menu($id);
			}*/
			
			echo json_encode($data);
		}
		
		/**
			*新闻列表函数
			*
			* @access  public
			* @return string
			*/
		public function newslist(){
			$num = 20;	//每页显示条数
			$catid = intval($this->uri->segment(3));		//所属栏目序号
			$id =  intval($this->uri->segment(4));		//当前页数
			$offset = $id*$num;		//每页偏移量
			$data['news']=$this->data->get_NewsList($catid,$offset,$num);
			
			echo json_encode($data);
		}
		
		/**
			*文章内容函数
			*
			* @access  public
			* @return string
			*/
		public function article(){
			$id = intval($this->uri->segment(3));		//文章索引
			$data['article']=$this->data->get_Article($id);
			
			echo json_encode($data);
		}
		
		/**
			*栏目内容函数
			*
			* @access  public
			* @return string
			*/
		public function content(){
			$catid = intval($this->uri->segment(3));		//文章索引
			$data['content']=$this->data->get_Content($catid);
			
			echo json_encode($data);
		}
	}